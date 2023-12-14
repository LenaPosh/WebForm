import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faSave} from '@fortawesome/free-solid-svg-icons';

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRowId, setEditingRowId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (id) => {
        setEditingRowId(id);
        setIsEditing(true);
    };

    const handleSave = async (id) => {
        setIsEditing(false);
        const editedItem = data.find(item => item.id === id);
        if (!editedItem) return;

        try {
            await axios.put(`http://18.215.164.227:8001/client/${id}`, editedItem);
            setEditingRowId(null);
            console.log('Изменения успешно сохранены');
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error.message);
        }
    };

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://18.215.164.227:8001/clients')
                .then(response => {
                    console.log('Data from server:', response.data); // Для отладки
                    const formattedData = response.data.data.map(item => ({
                        ...item,
                        document: item.document,
                    }));
                    setData(formattedData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        fetchData();
        let intervalId;
        if (!isEditing) {
            intervalId = setInterval(fetchData, 2000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isEditing]);



    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const handleEditChange = (id, field, value) => {
        const updatedData = data.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setData(updatedData);
    };
    const textPattern = "^[A-Za-zА-Яа-яЁё ]+$";

    return (
        <div>
            <table className="client-table" style={{ marginRight: '0px' }}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Passport ID</th>
                    <th>Date Added</th>
                    <th>Phone</th>
                    <th>Comments</th>
                    <th style={{ padding: '5px' }}>Actions</th>

                </tr>
                </thead>
                <tbody>
                {Array.isArray(data) && data.length > 0 ? (
                    data.map(item => (
                        <tr key={item.id}>
                            <td>
                                {editingRowId === item.id ? (
                                    <input
                                        type="text"
                                        value={item.name}
                                        pattern={textPattern}
                                        onChange={(e) => handleEditChange(item.id, 'name', e.target.value)}
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>
                            <td>
                                {editingRowId === item.id ? (
                                    <input
                                        type="text"
                                        value={item.last_name}
                                        pattern={textPattern}
                                        onChange={(e) => handleEditChange(item.id, 'last_name', e.target.value)}
                                    />
                                ) : (
                                    item.last_name
                                )}
                            </td>
                            <td>
                                {editingRowId === item.id ? (
                                    <input
                                        type="text"
                                        value={item.document}
                                        onChange={(e) => handleEditChange(item.id, 'document', e.target.value)}
                                    />
                                ) : (
                                    item.document
                                )}
                            </td>
                            <td>
                                {editingRowId === item.id ? (
                                    <input
                                        type="text"
                                        value={item.date_added}
                                        onChange={(e) => handleEditChange(item.id, 'date_added', e.target.value)}
                                    />
                                ) : (
                                    item.date_added
                                )}
                            </td>
                            <td>
                                {editingRowId === item.id ? (
                                    <input
                                        type="tel"
                                        value={item.phone}
                                        pattern="[0-9]*"
                                        onChange={(e) => handleEditChange(item.id, 'phone', e.target.value)}
                                    />
                                ) : (
                                    item.phone
                                )}
                            </td>
                            <td>
                                {editingRowId === item.id ? (
                                    <input
                                        type="text"
                                        value={item.comments}
                                        onChange={(e) => handleEditChange(item.id, 'comments', e.target.value)}
                                    />
                                ) : (
                                    item.comments
                                )}
                            </td>
                            <td>
                                {editingRowId === item.id ? (
                                    <button onClick={() => handleSave(item.id)}><FontAwesomeIcon icon={faSave} /></button>
                                ) : (
                                    <button onClick={() => handleEdit(item.id)}><FontAwesomeIcon icon={faEdit} /></button>
                                )}

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

г        </div>
    );
};

export default Table;


