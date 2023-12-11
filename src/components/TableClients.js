import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Pager, Paging, Editing, Button } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './TableClients.css';
import axios from 'axios';

const TableClients = () => {
    const [data, setData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
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
            const response = await axios.get('http://18.215.164.227:8001/clients');
            if (Array.isArray(response.data.data)) {
                const userData = response.data.data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    passportID: user.document,
                    comments: user.comments,
                }));
                setData(userData);
            } else {
                console.error('Данные не являются массивом:', response.data);
            }
        } catch (error) {
            console.error('Ошибка при получении данных:', error.message);
        }
    };


    const addRow = () => {
        setIsFormVisible(true);
    };

    const deleteRow = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    const saveNewClient = async () => {
        try {
            // Отправка данных нового клиента на сервер
            await axios.post('http://18.215.164.227:8001/users', newClient);
            // После успешной отправки обновите данные
            fetchData();
            setIsFormVisible(false);
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
        <div className="table-container" style={{ margin: '20px', marginTop: '30px' }}>
            <DataGrid
                dataSource={data}
                showBorders={true}
                keyExpr="id"
            >
                <Editing
                    mode="batch"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true}
                    texts={{ confirmDeleteMessage: '' }}
                    onInitNewRow={() => setIsFormVisible(true)}
                />
                <Column dataField="name" caption="Name" />
                <Column dataField="last_name" caption="Last Name" />
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
                    onClick={() => deleteRow(data[data.length - 1]?.id)}
                />
            </div>

            {isFormVisible && (
                <div className={`modal ${isFormVisible ? 'isAdding' : ''}`}>
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsFormVisible(false)}>
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


// import React, { useState, useEffect } from 'react';
// import DataGrid, { Column, Pager, Paging, Editing, Button } from 'devextreme-react/data-grid';
// import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
// import './TableClients.css';
// import axios from 'axios';
//
// const TableClients = () => {
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://18.215.164.227:8001/clients');
//             if (Array.isArray(response.data.data)) {
//                 const userData = response.data.data.map((user) => ({
//                     id: user.id,
//                     name: user.name,
//                     last_name: user.last_name,
//                     passportID: user.document,
//                     comments: user.comments,
//                 }));
//                 setData(userData);
//             } else {
//                 console.error('Данные не являются массивом:', response.data);
//             }
//         } catch (error) {
//             console.error('Ошибка при получении данных:', error.message);
//         }
//     };
//
//     const deleteRow = (id) => {
//         const newData = data.filter((item) => item.id !== id);
//         setData(newData);
//     };
//
//     const saveNewClient = async (newClient) => {
//         try {
//             // Отправка данных нового клиента на сервер
//             await axios.post('http://18.215.164.227:8001/users', newClient);
//             // После успешной отправки обновите данные
//             fetchData();
//         } catch (error) {
//             console.error('Ошибка при сохранении нового клиента:', error.message);
//         }
//     };
//
//     return (
//         <div className="table-container" style={{ margin: '20px', marginTop: '30px' }}>
//             <DataGrid
//                 dataSource={data}
//                 showBorders={true}
//                 keyExpr="id"
//             >
//                 <Editing
//                     mode="batch"
//                     allowAdding={true}
//                     allowDeleting={true}
//                     allowUpdating={true}
//                     texts={{ confirmDeleteMessage: '' }}
//                     onInitNewRow={(e) => saveNewClient(e.data)}
//                 />
//                 <Column dataField="name" caption="Name" />
//                 <Column dataField="last_name" caption="Last Name" />
//                 <Column dataField="passportID" caption="Passport ID" />
//                 <Column dataField="comments" caption="Comments" />
//                 <Pager allowedPageSizes={[10, 20, 30]} />
//                 <Paging defaultPageSize={10} />
//             </DataGrid>
//             <div style={{ marginTop: '10px' }}>
//                 <Button
//                     text="Add Row"
//                     onClick={() => saveNewClient({})}
//                 />
//                 <Button
//                     text="Delete Row"
//                     onClick={() => deleteRow(data[data.length - 1]?.id)}
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default TableClients;

