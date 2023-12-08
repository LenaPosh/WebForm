import React from 'react';
import TableClients from '../components/TableClients';
import Header from "../components/Header";

const ClientsPage = () => {

    return (
        <>
            <Header/>
            <div>
                <TableClients/>
            </div>
        </>

    );
};

export default ClientsPage;