import { createBrowserRouter } from 'react-router-dom';
import ClientPage from './pages/ClientsPage';
import DealsPage from './pages/DealsPage';
import CashPage from './pages/CashPage';
import SignInPage from './pages/SignInPage';
import BalancesPage from "./pages/BalancesPage";
import LoansPage from "./pages/LoansPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignInPage />
    },
    {
        path: '/signin',
        element: <SignInPage />,
    },
    {
        path: '/clients',
        element: (
            <ProtectedRoute>
                <ClientPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/deals',
        element: (
            <ProtectedRoute>
                <DealsPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/cash',
        element: (
            <ProtectedRoute>
                <CashPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/balances',
        element: (
            <ProtectedRoute>
                <BalancesPage />
            </ProtectedRoute>
        )
    },
    {
        path: '/loans',
        element: (
            <ProtectedRoute>
                <LoansPage/>
            </ProtectedRoute>
        )
    }
]);

