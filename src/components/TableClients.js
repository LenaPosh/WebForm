import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Pager, Paging, Editing, Button } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './TableClients.css';
import axios from 'axios';

const TableClients = () => {
    const [data, setData] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newClient, setNewClient] = useState({
        name: '',
        lastName: '',
        passportID: '',
        comments: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://18.215.164.227:8001');
            const userData = response.data.data.map((user) => ({
                key: user.id,
                name: user.first_name,
                lastName: user.last_name,
                passportID: user.id,
                comments: '',
                ...user,
            }));
            setData(userData);
        } catch (error) {
            console.error('Ошибка при получении данных:', error.message);
        }
    };

    const addRow = () => {
        setIsAdding(true);
    };

    const deleteRow = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const saveNewClient = async () => {
        try {
            // Отправка данных нового клиента на сервер
            await axios.post('http://18.215.164.227:8001/users', newClient);
            // После успешной отправки обновите данные
            fetchData();
            setIsAdding(false);
            setNewClient({
                name: '',
                lastName: '',
                passportID: '',
                comments: '',
            });
        } catch (error) {
            console.error('Ошибка при сохранении нового клиента:', error.message);
        }
    };

    return (
        <div className="table-container" style={{ margin: '20px', marginTop: '20px' }}>
            <DataGrid
                dataSource={data}
                showBorders={true}
                keyExpr="key"
            >
                <Editing
                    mode="batch"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true}
                    texts={{ confirmDeleteMessage: '' }}
                />
                <Column dataField="name" caption="Name" />
                <Column dataField="lastName" caption="Last Name" />
                <Column dataField="passportID" caption="Passport ID" />
                <Column dataField="comments" caption="Comments" />
                <Pager allowedPageSizes={[10, 20, 30]} />
                <Paging defaultPageSize={10} />
            </DataGrid>
            <div style={{ marginTop: '10px' }}>
                <Button
                    text="Add Row"
                    onClick={addRow}
                />
                <Button
                    text="Delete Row"
                    onClick={() => deleteRow(data[data.length - 1]?.key)}
                />
            </div>

            {/* Модальная форма для добавления нового клиента */}
            {isAdding && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsAdding(false)}>
                            &times;
                        </span>
                        <h2>Add New Client</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={newClient.name}
                                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                value={newClient.lastName}
                                onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                            />
                        </label>
                        <label>
                            Passport ID:
                            <input
                                type="text"
                                value={newClient.passportID}
                                onChange={(e) => setNewClient({ ...newClient, passportID: e.target.value })}
                            />
                        </label>
                        <label>
                            Comments:
                            <input
                                type="text"
                                value={newClient.comments}
                                onChange={(e) => setNewClient({ ...newClient, comments: e.target.value })}
                            />
                        </label>
                        <button onClick={saveNewClient}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableClients;

