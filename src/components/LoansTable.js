import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LoansTable.css';

const LoansTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editRowId, setEditRowId] = useState(null);
    const [repaymentDate, setRepaymentDate] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://conexuscrypto.co.za/api/loans', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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

    const handleDateChange = (e) => {
        // Получаем значение из input и преобразуем его в строку формата "YYYY-MM-DD HH:MM:SS"
        const localDate = e.target.value;
        const offset = new Date().getTimezoneOffset() * 60000; // Смещение временной зоны в миллисекундах
        const serverDate = new Date(new Date(localDate).getTime() - offset)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');

        setRepaymentDate(serverDate);
    };

    const handleRepay = (loanId) => {
        const token = localStorage.getItem('token');
        const payload = {
            id: loanId,
            date: repaymentDate
        };


        console.log('Sending to server:', payload);

        axios.post('https://conexuscrypto.co.za/api/repaid', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const updatedLoan = response.data.data;
                setData(data.map(item => item.id === loanId ? { ...item, ...updatedLoan, is_repaid: true } : item));
                setEditRowId(null);
            })
            .catch(error => {
                console.error('Error repaying loan:', error);
            });
    };



    const openEdit = (loanId) => {
        setEditRowId(loanId);
        setRepaymentDate(''); // Сбросить дату погашения
    };


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
                        <td>
                            {editRowId === item.id ? (
                                <>
                                    <input
                                        type="datetime-local"
                                        value={repaymentDate}
                                        onChange={handleDateChange}
                                    />
                                    <button style={{color: '#5b296b'}} onClick={() => handleRepay(item.id)}>Confirm</button>
                                    <button onClick={() => setEditRowId(null)}>Cancel</button>
                                </>
                            ) : item.is_repaid ? item.repaid_date : (
                                <button onClick={() => openEdit(item.id)}>Repaid</button>
                            )}
                        </td>
                        <td>{item.maturity_date || 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoansTable;
