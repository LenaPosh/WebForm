import React from 'react';
import TableCash from '../components/TableCash';
import Header from "../components/Header";

const CashPage = () => {
    const cashData = []; // Ваши данные

    return (
        <>
            <Header/>
            <TableCash data={cashData} />

        </>

    );
};

export default CashPage;