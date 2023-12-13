import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BalanceTable.css';

const CashTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://18.215.164.227:8001/cash_transactions')
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
        <div className="table-container-balance">
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>User ID</th>
                    <th>Currency ID</th>
                    <th>Direction ID</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.login}</td>
                        <td>{item.short_name}</td>
                        <td>{item.direction}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CashTable;

