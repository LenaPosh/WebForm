import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newClients, setNewClients] = useState([]);


    useEffect(() => {
        axios.get('http://18.215.164.227:8001/clients')
            .then(response => {
                console.log('Data from server:', response.data.data);
                const formattedData = response.data.data.map(item => ({
                    ...item,
                    passportID: item.document,
                }));
                setData(formattedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);



    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://18.215.164.227:8001/client/${id}`);
            setData((prevData) => prevData.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleEdit = async (id, newData) => {
        try {
            await axios.put(`http://18.215.164.227:8001/client/${id}`, newData);
            setData((prevData) => prevData.map(item => (item.id === id ? { ...item, ...newData } : item)));
        } catch (error) {
            console.error('Error editing data:', error);
        }
    };

    const handleSaveChanges = async () => {
        try {

            for (const newClient of newClients) {
                await axios.post('http://18.215.164.227:8001/client', newClient);
            }

            setNewClients([]);

            console.log('Изменения успешно сохранены');
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error.message);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <table className="client-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Passport ID</th>
                    <th>Date Added</th> {/* Добавлен новый столбец */}
                    <th>Phone</th> {/* Добавлен новый столбец */}
                    <th>Comments</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.passportID}</td>
                            <td>{item.date_added}</td> {/* Добавлено отображение нового поля */}
                            <td>{item.phone}</td> {/* Добавлено отображение нового поля */}
                            <td>{item.comments}</td>
                            <td>
                                <button onClick={() => handleDelete(item.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button onClick={() => handleEdit(item.id, { /* Обновите параметры здесь */ })}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">No data available</td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Кнопка для сохранения изменений */}
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default Table;



