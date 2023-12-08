import {createBrowserRouter} from "react-router-dom";
import ClientPage from "./pages/ClientsPage";
import DealsPage from "./pages/DealsPage";
import CashPage from "./pages/CashPage";
import RegistrationPage from "./pages/RegistrationPage";


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
        },
        {
            path: "/registration",
            element: <RegistrationPage/>
        }




    ],
);