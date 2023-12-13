import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BalanceTable.css'

const BalancesTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://18.215.164.227:8001/balances')
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
                    <th>Short Name</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.short_name}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    );
};

export default BalancesTable;

