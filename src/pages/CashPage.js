import React from 'react';
import Header from "../components/Header";
import AddClientForm from "../components/AddClientForm";

const CashPage = () => {
    const onSave = (formData) => {
        console.log('Данные сохранены:', formData);
    };

    return (
        <>
            <Header/>

            <AddClientForm onSave={onSave} />
        </>
    );
};

export default CashPage;
