import React from 'react';
import Header from "../components/Header";
import CashTable from "../components/CashTable";


const CashPage = () => {
    // const onSave = (formData) => {
    //     console.log('Данные сохранены:', formData);
    // };

    return (
        <>
            <Header/>
            <CashTable/>


            {/*<AddClientForm onSave={onSave} />*/}
        </>
    );
};

export default CashPage;
