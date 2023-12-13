import { createBrowserRouter } from 'react-router-dom';
import ClientPage from './pages/ClientsPage';
import DealsPage from './pages/DealsPage';
import CashPage from './pages/CashPage';
import SignInPage from './pages/SignInPage';
import BalancesPage from "./pages/BalancesPage";

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
        element: <ClientPage />,
    },
    {
        path: '/deals',
        element: <DealsPage />,
    },
    {
        path: '/cash',
        element: <CashPage />,
    },
    {
        path: '/balances',
        element: <BalancesPage />,
    },

]);

