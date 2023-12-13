import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewTable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import AddClientForm from './AddClientForm';

const TableWithForm = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRowId, setEditingRowId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        axios.get('http://18.215.164.227:8001/clients')
            .then(response => {
                console.log('Data from server:', response.data.data);
                const formattedData = response.data.data.map(item => ({
                    ...item,
                    document: item.document,
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

    const handleEdit = (id) => {
        setEditingRowId(id);
    };

    const handleSave = async (id) => {
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

    const handleEditChange = (id, field, value) => {
        const updatedData = data.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setData(updatedData);
    };

    const handleFormSave = async (formData) => {
        try {
            const formattedData = {
                name: formData.name,
                last_name: formData.lastName,
                passportID: formData.passportID,
                comments: formData.comments,
                date_added: formData.date,
                phone: formData.phone
            };

            const response = await axios.post('http://18.215.164.227:8001/client', formattedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setData(prevData => [...prevData, response.data]);
            console.log('Новый клиент успешно добавлен:', response.data);

            setEditingRowId(null);
            setIsFormVisible(false);
        } catch (error) {
            console.error('Ошибка при сохранении нового клиента:', error.message);
        }
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div>
            <div className="add-client-button-container">
                <button className="add-client-button" onClick={toggleFormVisibility}>
                    {isFormVisible ? 'Cancel' : 'Add Client'}
                </button>
            </div>
            {isFormVisible && <AddClientForm onSave={handleFormSave} />}
            <table className="client-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Passport ID</th>
                    <th>Date Added</th>
                    <th>Phone</th>
                    <th>Comments</th>
                    <th className="actions-column">Actions</th>
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
                                        type="text"
                                        value={item.phone}
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
                            <td className="actions-column">
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
        </div>
    );
};

export default TableWithForm;



