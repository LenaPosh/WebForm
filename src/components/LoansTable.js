import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoansTable.css';

const LoansTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://conexuscrypto.co.za/api/loans')
            .then(response => {
                setData(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Загрузка данных...</p>;
    }

    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
        <div className="table-container-loans">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Login</th>
                    <th>Currency</th>
                    <th>Direction</th>
                    <th>Amount</th>
                    <th>Comments</th>
                    <th>Repaid</th>
                    <th>Maturity Date</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.id} className={item.direction === 'Deposit' ? 'deposit-row' : 'withdraw-row'}>
                        <td>{item.id}</td>
                        <td>{item.date}</td>
                        <td>{item.login}</td>
                        <td>{item.short_name}</td>
                        <td>{item.direction}</td>
                        <td>{item.amount}</td>
                        <td>{item.comments || 'No comments'}</td>
                        <td>{item.is_repaid ? 'Yes' : 'No'}</td>
                        <td>{item.maturity_date || 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoansTable;
