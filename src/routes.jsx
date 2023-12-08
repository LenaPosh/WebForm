import {createBrowserRouter} from "react-router-dom";
import ClientPage from "./pages/ClientsPage";
import DealsPage from "./pages/DealsPage";
import CashPage from "./pages/CashPage";


export const router = createBrowserRouter([
        {
            path: "/",
            element: <ClientPage />
        },
        {
            path: "/clients",
            element: <ClientPage />
        },
        {
            path: "/deals",
            element: <DealsPage />
        },
        {
            path: "/cash",
            element: <CashPage />
        }

    ],
);