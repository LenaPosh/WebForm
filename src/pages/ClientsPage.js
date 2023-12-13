import React from 'react';
import TableClients from '../components/TableClients';
import Header from "../components/Header";
import AppClients from "../components/AddClientForm";

const ClientsPage = () => {

    return (
        <>
            <Header/>
            <AppClients/>

            <div>
                <TableClients/>
            </div>
        </>

    );
};

export default ClientsPage;