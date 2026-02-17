# Specification

## Summary
**Goal:** Build the LilaC Boutique luxury abaya website with a consistent premium theme, public catalog/offer pages with WhatsApp ordering, a contact page with enquiry capture, and a secure admin dashboard to manage products, banners, and enquiries.

**Planned changes:**
- Implement a consistent luxury UI theme (deep purple primary, black/gold accents, white backgrounds, script headings + sans-serif body, subtle scroll animations).
- Create public pages and navigation: Homepage, Abaya Collection, Current Offers, Contact, and Product Details.
- Homepage hero with exact headline/subtext and CTAs for Collection navigation and WhatsApp (+971 585473939).
- Backend data models + APIs for products (multi-photo, pricing AED, sizes/colors, fabric/embroidery, stock, isNew, upload date), offers (old/new price), and banner slides.
- Abaya Collection page with product cards (all requested fields), filters (New arrivals, Offers, Price range, Size, Color) without full reload, WhatsApp order, and enquiry form prefilled with selected product.
- Current Offers page showing discounted products with old/new AED pricing and a backend-driven banner slider.
- New Arrivals behavior: newest-first where applicable, visible upload date, and “NEW” tag for isNew products.
- Product Details page with size selector, custom tailoring request box, and WhatsApp order button using the exact message template with product name (and appended tailoring text if provided).
- Contact page with exact business text, click-to-call, click-to-WhatsApp, Google Maps iframe embed, and a contact form that stores enquiries in the backend.
- Secure Admin Dashboard with Internet Identity login and backend-stored admin allowlist authorization.
- Admin features: CRUD products, manage/reorder multiple images, set AED prices, sizes/colors, NEW flag, offers (old/new), stock toggle, edit banner slides, update contact info, view/manage enquiries (status New/Contacted/Ordered), WhatsApp reply shortcut, and CSV download of customer list.

**User-visible outcome:** Visitors can browse abayas, filter and view details, see current offers, submit enquiries, and place orders via WhatsApp; admins can securely log in to manage catalog content, banners, contact info, and customer enquiries.
