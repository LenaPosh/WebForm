import React from 'react';
import Header from "../components/Header";
import AppClients from "../components/AddClientForm";
import Table from "../components/NewTable";
// import AppClients from "../components/AddClientForm";
// import Table from "../components/NewTable";


const ClientsPage = () => {

    return (
        <>
            <Header/>
            <AppClients/>
            <Table/>
            {/*<TableWithForm/>*/}
        </>

    );
};

export default ClientsPage;