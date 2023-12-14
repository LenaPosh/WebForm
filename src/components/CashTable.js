import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BalanceTable.css';

const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(',', '');
};

const CashTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [operators, setOperators] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [directions, setDirections] = useState([]);

    const fetchData = () => {
        setLoading(true);
        axios.get('http://18.215.164.227:8001/cash_transactions')
            .then(response => {
                const formattedData = response.data.data.map(item => ({
                    ...item,
                    date: formatDate(item.date)
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
        axios.get('http://18.215.164.227:8001/operators')
            .then(response => setOperators(response.data.data))
            .catch(error => console.error('Ошибка при получении операторов:', error));

        axios.get('http://18.215.164.227:8001/currencies')
            .then(response => setCurrencies(response.data.data))
            .catch(error => console.error('Ошибка при получении валют:', error));

        axios.get('http://18.215.164.227:8001/directions')
            .then(response => setDirections(response.data.data))
            .catch(error => console.error('Ошибка при получении направлений:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const now = new Date();
        const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        const data = {
            date: formattedDateTime,
            users_id: formData.get('userId'),
            currencies_id: formData.get('currencyId'),
            directions_id: formData.get('directionId'),
            amount: formData.get('amount'),
            comments: 'comments'
        };

        console.log('Отправка данных на сервер:', data);

        axios.post('http://18.215.164.227:8001/cash_transaction', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Ответ сервера:', response.data);
                setShowForm(false);
                fetchData();
            })
            .catch(error => {
                console.error('Ошибка при отправке данных:', error);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }





    return (
        <div className="table-container-balance">
            <button onClick={() => setShowForm(true)}>Add</button>
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

            {showForm && (
                <div className={`modal-cash ${showForm ? 'active' : ''}`}>
                    <div className="modal-content-cash">
                        <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="date">Date:</label>
                            <input type="date" name="date" id="date" required />
                        </div>
                        <div>
                            <label htmlFor="userId">User:</label>
                            <select name="userId" id="userId" required>
                                {operators.map(op => <option key={op.id} value={op.id}>{op.login}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="currencyId">Currency:</label>
                            <select name="currencyId" id="currencyId" required>
                                {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.short_name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="directionId">direction:</label>
                            <select name="directionId" id="directionId" required>
                                {directions.map(direction => <option key={direction.id} value={direction.id}>{direction.direction}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="amount">Amount:</label>
                            <input type="number" name="amount" id="amount" required />
                        </div>
                        <button type="submit" style={{backgroundColor: '#5b296b',marginRight: '10px'}}>Send</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </div>
                </div>
            )}
        </div>
    );
};

export default CashTable;


