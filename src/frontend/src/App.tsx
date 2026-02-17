import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ProductsAdminPage from './pages/admin/ProductsAdminPage';
import OffersAdminPage from './pages/admin/OffersAdminPage';
import ContactAdminPage from './pages/admin/ContactAdminPage';
import EnquiriesAdminPage from './pages/admin/EnquiriesAdminPage';
import { AdminRouteGuard } from './components/auth/AdminRouteGuard';

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">
                <Outlet />
            </main>
            <SiteFooter />
        </div>
    );
}

function AdminLayout() {
    return (
        <AdminRouteGuard>
            <div className="min-h-screen flex flex-col bg-muted/30">
                <Outlet />
            </div>
        </AdminRouteGuard>
    );
}

const rootRoute = createRootRoute({
    component: Layout
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
});

const collectionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/collection',
    component: CollectionPage
});

const offersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/offers',
    component: OffersPage
});

const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/contact',
    component: ContactPage
});

const productDetailsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/product/$productId',
    component: ProductDetailsPage
});

const adminLoginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/admin/login',
    component: AdminLoginPage
});

const adminRootRoute = createRootRoute({
    component: AdminLayout
});

const adminDashboardRoute = createRoute({
    getParentRoute: () => adminRootRoute,
    path: '/admin',
    component: AdminDashboardPage
});

const adminProductsRoute = createRoute({
    getParentRoute: () => adminRootRoute,
    path: '/admin/products',
    component: ProductsAdminPage
});

const adminOffersRoute = createRoute({
    getParentRoute: () => adminRootRoute,
    path: '/admin/offers',
    component: OffersAdminPage
});

const adminContactRoute = createRoute({
    getParentRoute: () => adminRootRoute,
    path: '/admin/contact',
    component: ContactAdminPage
});

const adminEnquiriesRoute = createRoute({
    getParentRoute: () => adminRootRoute,
    path: '/admin/enquiries',
    component: EnquiriesAdminPage
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    collectionRoute,
    offersRoute,
    contactRoute,
    productDetailsRoute,
    adminLoginRoute
]);

const adminRouteTree = adminRootRoute.addChildren([
    adminDashboardRoute,
    adminProductsRoute,
    adminOffersRoute,
    adminContactRoute,
    adminEnquiriesRoute
]);

const router = createRouter({ routeTree });
const adminRouter = createRouter({ routeTree: adminRouteTree });

function App() {
    const isAdminRoute = window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login';
    
    return <RouterProvider router={isAdminRoute ? adminRouter : router} />;
}

export default App;
