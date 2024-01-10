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

    const [isCredit, setIsCredit] = useState(false);
    const [isCreditReturned, setIsCreditReturned] = useState({});

    const fetchData = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, redirecting to login...');

            setError('Please log in to view this page.');
            setLoading(false);
            return;
        }
        setLoading(true);
        axios.get('https://conexuscrypto.co.za/api/cash_transactions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {

                const sortedData = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));

                const formattedData = sortedData.map(item => ({
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
        const token = localStorage.getItem('token');
        fetchData();
        axios.get('https://conexuscrypto.co.za/api/operators', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => setOperators(response.data.data))
            .catch(error => console.error('Ошибка при получении операторов:', error));

        axios.get('https://conexuscrypto.co.za/api/currencies', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => setCurrencies(response.data.data))
            .catch(error => console.error('Ошибка при получении валют:', error));

        axios.get('https://conexuscrypto.co.za/api/directions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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
            comments: formData.get('comments')
        };

        console.log('Отправка данных на сервер:', data);

        const token = localStorage.getItem('token');
        axios.post('https://conexuscrypto.co.za/api/cash_transaction', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

        // const creditData = {
        //     ...data,
        //     isCredit: isCredit
        // };
    };



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const handleCreditReturn = (transactionId) => {
        const returnDate = formatDate(new Date().toISOString());
        setIsCreditReturned(prevState => ({ ...prevState, [transactionId]: returnDate }));

        // Здесь код для отправки данных о возврате кредита на сервер
    };

    return (
        <div className="table-container-balance">
            <button onClick={() => setShowForm(true)} style={{ padding: '10px 20px'  }}>
                <span style={{ marginRight: '5px',  fontSize: '20px'  }}>+</span> Add
            </button>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>User ID</th>
                    <th>Currency ID</th>
                    <th>Direction ID</th>
                    <th>Loans</th>
                    <th>Loans Return</th>
                    <th>Amount</th>
                    <th>Сomments</th>

                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.login}</td>
                        <td>{item.short_name}</td>
                        <td>{item.direction}</td>
                        <td>{item.isCredit ? 'Yes' : 'No'}</td>
                        <td>
                            {item.isCredit && !isCreditReturned[item.id] ? (
                                <button onClick={() => handleCreditReturn(item.id)}>Return Credit</button>
                            ) : (
                                isCreditReturned[item.id]
                            )}
                        </td>
                        <td>{item.amount}</td>
                        <td>{item.comments}</td>
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

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <label htmlFor="isCredit" style={{ marginRight: '15px' }}>Loan:</label>
                                <input
                                    type="checkbox"
                                    name="isCredit"
                                    id="isCredit"
                                    onChange={(e) => setIsCredit(e.target.checked)}
                                    style={{ width: '18px', height: '20px', margin: '0 3px 10px 0' }} // Задаем размер и отступы для чекбокса
                                />
                            </div>



                        <div>
                            <label htmlFor="amount">Amount:</label>
                            <input type="number" name="amount" id="amount" required />
                        </div>
                            <div>
                                <label htmlFor="comments">Сomments:</label>
                                <input name="comments" id="comments" required />
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



