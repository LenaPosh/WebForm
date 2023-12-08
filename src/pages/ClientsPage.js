import React from 'react';
import TableClients from '../components/TableClients';
import Header from "../components/Header";

const ClientsPage = () => {
    const clientsData = []; // Ваши данные

    return (
        <>
            <Header/>
            <div>
                <TableClients data={clientsData} />
            </div>
        </>

    );
};

export default ClientsPage;