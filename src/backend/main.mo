import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Set "mo:core/Set";
import Runtime "mo:core/Runtime";
import Queue "mo:core/Queue";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Product = {
    id : Nat;
    name : Text;
    priceInAED : Nat;
    sizes : [Text];
    colors : [Text];
    fabricDetails : Text;
    embroideryDetails : Text;
    stockAvailable : Bool;
    isNew : Bool;
    uploadDate : Time.Time;
    discountPrice : ?Nat;
    oldPrice : ?Nat;
    images : [Storage.ExternalBlob];
  };

  module Product {
    public func compareByDate(a : Product, b : Product) : Order.Order {
      if (a.uploadDate > b.uploadDate) {
        #less;
      } else if (a.uploadDate < b.uploadDate) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  type EnquiryStatus = {
    #new;
    #contacted;
    #ordered;
  };

  type ContactInfo = {
    businessName : Text;
    address : Text;
    phone : Text;
  };

  type Enquiry = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    createdAt : Time.Time;
    status : EnquiryStatus;
  };

  type Offer = {
    bannerText : Text;
    image : Storage.ExternalBlob;
  };

  public type UserProfile = {
    name : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  let products = Map.empty<Nat, Product>();
  var nextProductId = 0;

  let offers = Map.empty<Nat, Offer>();
  var nextOfferId = 0;

  var contactInfo : ContactInfo = {
    businessName = "Lila Boutique – Tailoring & Embroidery";
    address = "Al Khalidiya, Behind Muhairi Centre – Building 28, Abu Dhabi – UAE";
    phone = "+971 585473939";
  };

  let enquiries = Map.empty<Nat, Enquiry>();
  var nextEnquiryId = 0;

  let userProfiles = Map.empty<Principal, UserProfile>();

  ///////////////////////////////////////////////////////
  // USER PROFILE MANAGEMENT //
  ///////////////////////////////////////////////////////

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  ///////////////////////////////////////////////////////
  // PRODUCTS ADMIN //
  /////////////////////////////////////////////////////
  public shared ({ caller }) func addProduct(
    name : Text,
    priceInAED : Nat,
    sizes : [Text],
    colors : [Text],
    fabricDetails : Text,
    embroideryDetails : Text,
    stockAvailable : Bool,
    isNew : Bool,
    discountPrice : ?Nat,
    oldPrice : ?Nat,
    images : [Storage.ExternalBlob],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let productId = nextProductId;
    let newProduct : Product = {
      id = productId;
      name;
      priceInAED;
      sizes;
      colors;
      fabricDetails;
      embroideryDetails;
      stockAvailable;
      isNew;
      uploadDate = Time.now();
      discountPrice;
      oldPrice;
      images;
    };

    products.add(productId, newProduct);
    nextProductId += 1;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    let sortedProductIds = products.keys().toArray();
    sortedProductIds.map<Nat, Product>(
      func(id) {
        switch (products.get(id)) {
          case (null) { Runtime.trap("Product not found") };
          case (?product) { product };
        };
      }
    );
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func updateProduct(
    id : Nat,
    name : Text,
    priceInAED : Nat,
    sizes : [Text],
    colors : [Text],
    fabricDetails : Text,
    embroideryDetails : Text,
    stockAvailable : Bool,
    isNew : Bool,
    discountPrice : ?Nat,
    oldPrice : ?Nat,
    images : [Storage.ExternalBlob],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          id;
          name;
          priceInAED;
          sizes;
          colors;
          fabricDetails;
          embroideryDetails;
          stockAvailable;
          isNew;
          uploadDate = Time.now();
          discountPrice;
          oldPrice;
          images;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) { products.remove(id) };
    };
  };

  public query ({ caller }) func getNewArrivals(count : Nat) : async [Product] {
    let sortedByDate = products.values().toArray().sort(Product.compareByDate);
    let actualCount = if (count > sortedByDate.size()) { sortedByDate.size() } else { count };
    Array.tabulate<Product>(actualCount, func(i) { sortedByDate[i] });
  };

  public query ({ caller }) func getProductsByPriceRange(minPrice : Nat, maxPrice : Nat) : async [Product] {
    let productsInRange = Queue.empty<Product>();
    for (product in products.values()) {
      if (product.priceInAED >= minPrice and product.priceInAED <= maxPrice) {
        productsInRange.pushBack(product);
      };
    };
    productsInRange.toArray();
  };

  public query ({ caller }) func searchProductsByName(name : Text) : async [Product] {
    let matchingProducts = Queue.empty<Product>();
    for (product in products.values()) {
      if (product.name.contains(#text name)) {
        matchingProducts.pushBack(product);
      };
    };
    matchingProducts.toArray();
  };

  public shared ({ caller }) func uploadProductImage(blob : Storage.ExternalBlob) : async Storage.ExternalBlob {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    blob;
  };

  public shared ({ caller }) func deleteProductImage(_path : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    Runtime.trap("Not implemented");
  };

  ///////////////////////////////////////////////////////
  // OFFER BANNERS ADMIN //
  //////////////////////////////////////////////////////

  public shared ({ caller }) func addOffer(bannerText : Text, image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let offerId = nextOfferId;
    offers.add(offerId, { bannerText; image });
    nextOfferId += 1;
  };

  public query ({ caller }) func getOffers() : async [Offer] {
    let sortedOfferIds = offers.keys().toArray();
    sortedOfferIds.map<Nat, Offer>(
      func(id) {
        switch (offers.get(id)) {
          case (null) { Runtime.trap("Offer not found") };
          case (?offer) { offer };
        };
      }
    );
  };

  public shared ({ caller }) func updateOffer(id : Nat, bannerText : Text, image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (offers.get(id)) {
      case (null) { Runtime.trap("Offer not found") };
      case (?_) {
        offers.add(id, { bannerText; image });
      };
    };
  };

  public shared ({ caller }) func deleteOffer(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (offers.get(id)) {
      case (null) { Runtime.trap("Offer not found") };
      case (?_) { offers.remove(id) };
    };
  };

  ///////////////////////////////////////////////////////
  // CONTACT PAGE FUNCTIONALITY //
  //////////////////////////////////////////////////////

  public query ({ caller }) func getContactInfo() : async ContactInfo {
    contactInfo;
  };

  public shared ({ caller }) func updateContactInfo(newContactInfo : ContactInfo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    contactInfo := newContactInfo;
  };

  ///////////////////////////////////////////////////////
  // CONTACT FORM & ENQUIRIES //
  ///////////////////////////////////////////////////////
  public shared ({ caller }) func submitEnquiry(name : Text, email : Text, message : Text) : async () {
    let enquiryId = nextEnquiryId;
    let newEnquiry : Enquiry = {
      id = enquiryId;
      name;
      email;
      message;
      createdAt = Time.now();
      status = #new;
    };

    enquiries.add(enquiryId, newEnquiry);
    nextEnquiryId += 1;
  };

  public query ({ caller }) func getEnquiries() : async [Enquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let sortedEnquiryIds = enquiries.keys().toArray();
    sortedEnquiryIds.map<Nat, Enquiry>(
      func(id) {
        switch (enquiries.get(id)) {
          case (null) { Runtime.trap("Enquiry not found") };
          case (?enquiry) { enquiry };
        };
      }
    );
  };

  public shared ({ caller }) func updateEnquiryStatus(id : Nat, status : EnquiryStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (enquiries.get(id)) {
      case (null) { Runtime.trap("Enquiry not found") };
      case (?enquiry) {
        let updatedEnquiry : Enquiry = {
          enquiry with status
        };
        enquiries.add(id, updatedEnquiry);
      };
    };
  };

  public query ({ caller }) func getCustomerList() : async [(Text, Text)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let sortedEnquiryIds = enquiries.keys().toArray();
    sortedEnquiryIds.map<Nat, (Text, Text)>(
      func(id) {
        switch (enquiries.get(id)) {
          case (null) { ("", "") };
          case (?enquiry) { (enquiry.name, enquiry.email) };
        };
      }
    );
  };
};
