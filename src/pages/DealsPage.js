import React from 'react';
import TableDeals from '../components/TableDeals';
import Header from "../components/Header";

const DealsPage = () => {
    const dealsData = []; // Ваши данные

    return (
        <>
            <Header/>
            <TableDeals data={dealsData} />
        </>
    );
};

export default DealsPage;