import React from 'react';
import Header from "../components/Header";
import AppClients from "../components/AddClientForm";
import Table from "../components/NewTable";
// import AddClientForm from "../components/AddClientForm";

const CashPage = () => {
    // const onSave = (formData) => {
    //     console.log('Данные сохранены:', formData);
    // };

    return (
        <>
            <Header/>
            <AppClients/>
            <Table/>

            {/*<AddClientForm onSave={onSave} />*/}
        </>
    );
};

export default CashPage;
