import React from 'react';
import TableCash from '../components/TableCash';
import Header from "../components/Header";
import AddClientForm from "../components/AddClientForm";
// import YourComponent from "../components/respons";

const CashPage = () => {
    return (
        <>
            <Header/>
            <TableCash/>
            {/*<YourComponent/>*/}
            <AddClientForm/>

        </>

    );
};

export default CashPage;