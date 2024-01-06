
import React, { useState, useEffect, useRef } from 'react';
import DataGrid, { Column, Pager, Paging, Editing } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.material.blue.light.css';
import './TableClients.css';
import axios from 'axios';
import { Button } from 'devextreme-react';

const TableClients = () => {
    const [data, setData] = useState([]);
    const [newClients, setNewClients] = useState([]);
    const [editingRowId, setEditingRowId] = useState(null);
    const dataGridRef = useRef(null);

    const [updatedClients, setUpdatedClients] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://conexuscrypto.co.za/api/clients');
            if (Array.isArray(response.data.data)) {
                const userData = response.data.data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    document: user.document,
                    comments: user.comments,
                    dateAdded: user.date_added,
                    phone: user.phone,
                }));
                setData(userData);
            } else {
                console.log('Данные не являются массивом:', response.data);
            }
        } catch (error) {
            console.log('Ошибка при получении данных:', error.message);
        }
    };

    useEffect(() => {
        fetchData();

        const intervalId = setInterval(() => {
            fetchData();
        }, 40000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const deleteRow = async (id) => {
        try {
            await axios.delete(`http://18.215.164.227:8001/client/${id}`);
            const newData = data.filter((item) => item.id !== id);
            setData(newData);
        } catch (error) {
            console.error('Ошибка при удалении клиента:', error.message);
        }
    };

    // const saveNewClient = async (newClient) => {
    //     try {
    //         const response = await axios.post('http://18.215.164.227:8001/client', newClient);
    //         console.log('Ответ от сервера:', response);
    //
    //         fetchData();
    //
    //         // Обновите состояние новых клиентов
    //         setNewClients((prevClients) => [...prevClients, response.data]);
    //
    //         if (dataGridRef.current && dataGridRef.current.instance) {
    //             dataGridRef.current.instance.repaint();
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при сохранении нового клиента:', error.message);
    //         console.error('Ошибка в ответе сервера:', error.response?.data);
    //     }
    // };

    const handleSaveChanges = async () => {
        console.log("Сохранение изменений:", updatedClients);
        try {
            for (const client of updatedClients) {
                await axios.put(`http://18.215.164.227:8001/client/${client.id}`, client);
            }
            setUpdatedClients([]);
            fetchData();
        } catch (error) {
            console.error('Ошибка при сохранении изменений:', error.message);
        }
    };

    const handleEdit = (id) => {
        setEditingRowId(id);
    };

    const buttons = [
        {
            name: 'edit',
            icon: 'edit',
            onClick: (e) => handleEdit(e.row.data.id),
        },
        {
            name: 'delete',
            icon: 'trash',
            onClick: (e) => deleteRow(e.row.data.id),
        },
    ];

    const handleRowUpdate = (e) => {
        const updatedData = e.data;

        setUpdatedClients(prev => {
            const existingClientIndex = prev.findIndex(client => client.id === updatedData.id);
            if (existingClientIndex > -1) {
                const newClients = [...prev];
                newClients[existingClientIndex] = updatedData;
                return newClients;
            } else {
                return [...prev, updatedData];
            }
        });
    };

    return (
        <div className="table-container" style={{ margin: '20px', }}>
            <DataGrid
                ref={dataGridRef}
                dataSource={data}
                showBorders={true}
                keyExpr="id"
            >
                <Editing
                    mode="batch"
                    allowAdding={false}
                    allowDeleting={true}
                    allowUpdating={true}
                    useIcons={true}
                    onRowInserted={(e) => {
                        // Добавляем нового клиента при добавлении строки
                        setNewClients((prevClients) => [...prevClients, e.data]);
                    }}
                    onRowUpdated={handleRowUpdate}
                />
                <Column dataField="name" caption="Name" />
                <Column dataField="last_name" caption="Last Name" />
                <Column dataField="document" caption="Passport ID" />
                <Column dataField="dateAdded" caption="Date Added" dataType="date" />
                <Column dataField="phone" caption="Phone" />
                <Column dataField="comments" caption="Comments" />

                <Column type="buttons" width={110} buttons={buttons} />
                <Pager allowedPageSizes={[10, 20, 30]} />
                <Paging defaultPageSize={10} />
            </DataGrid>

            <div style={{ marginTop: '10px' }}>
                <Button
                    text="Save Changes"
                    onClick={() => handleSaveChanges()} style={{ backgroundColor: '#4b296b', color: 'white', margin: '10px' }}
                />

            </div>
        </div>
    );
};

export default TableClients;

//
// import React, { useState, useEffect, useRef } from 'react';
// import DataGrid, { Column, Pager, Paging, Editing } from 'devextreme-react/data-grid';
// import 'devextreme/dist/css/dx.common.css';
// import 'devextreme/dist/css/dx.light.css';
// import 'devextreme/dist/css/dx.material.blue.light.css';
// import './TableClients.css';
// import axios from 'axios';
// import { Button } from 'devextreme-react';
//
// const TableClients = () => {
//     const [data, setData] = useState([]);
//     const [newClients, setNewClients] = useState([]); // Новые клиенты, добавленные в режиме batch
//     const [editingRowId, setEditingRowId] = useState(null);
//     const dataGridRef = useRef(null);
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/http://18.215.164.227:8001/clients');
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
//                 console.log('Данные не являются массивом:', response.data);
//             }
//         } catch (error) {
//             console.log('Ошибка при получении данных:', error.message);
//         }
//     };
//
//     useEffect(() => {
//         fetchData();
//
//         const intervalId = setInterval(() => {
//             fetchData();
//         }, 40000);
//
//         return () => {
//             clearInterval(intervalId);
//         };
//     }, []);
//
//     const deleteRow = async (id) => {
//         try {
//             await axios.delete(`http://18.215.164.227:8001/client/${id}`);
//             const newData = data.filter((item) => item.id !== id);
//             setData(newData);
//         } catch (error) {
//             console.error('Ошибка при удалении клиента:', error.message);
//         }
//     };
//
//     const saveNewClient = async (newClient) => {
//         try {
//             const response = await axios.post('http://18.215.164.227:8001/client', newClient);
//             console.log('Ответ от сервера:', response);
//
//             // Обновите данные в таблице после успешного сохранения
//             fetchData();
//
//             // Обновите состояние новых клиентов
//             setNewClients((prevClients) => [...prevClients, response.data]);
//
//             if (dataGridRef.current && dataGridRef.current.instance) {
//                 dataGridRef.current.instance.repaint();
//             }
//         } catch (error) {
//             console.error('Ошибка при сохранении нового клиента:', error.message);
//             console.error('Ошибка в ответе сервера:', error.response?.data);
//         }
//     };
//
//     const handleSaveChanges = async () => {
//         try {
//             if (dataGridRef.current && dataGridRef.current.instance) {
//                 // Сохраняем изменения в режиме batch
//                 await dataGridRef.current.instance.saveEditData();
//
//                 // Сохраняем новых клиентов
//                 for (const newClient of newClients) {
//                     await saveNewClient(newClient);
//                 }
//
//                 // Очищаем список новых клиентов
//                 setNewClients([]);
//
//                 console.log('Изменения успешно сохранены');
//             }
//         } catch (error) {
//             console.error('Ошибка при сохранении изменений:', error.message);
//         }
//     };
//
//     const handleEdit = (id) => {
//         setEditingRowId(id);
//     };
//
//     const buttons = [
//         {
//             name: 'edit',
//             icon: 'edit',
//             onClick: (e) => handleEdit(e.row.data.id),
//         },
//         {
//             name: 'delete',
//             icon: 'trash',
//             onClick: (e) => deleteRow(e.row.data.id),
//         },
//     ];
//
//     return (
//         <div className="table-container" style={{ margin: '20px', marginTop: '30px' }}>
//             <DataGrid
//                 ref={dataGridRef}
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
//                     useIcons={true}
//                     onRowInserted={(e) => {
//                         // Добавляем нового клиента при добавлении строки
//                         setNewClients((prevClients) => [...prevClients, e.data]);
//                     }}
//                 />
//                 <Column dataField="name" caption="Name" />
//                 <Column dataField="last_name" caption="Last Name" />
//                 <Column dataField="passportID" caption="Passport ID" />
//                 <Column dataField="comments" caption="Comments" />
//                 <Column type="buttons" width={110} buttons={buttons} />
//                 <Pager allowedPageSizes={[10, 20, 30]} />
//                 <Paging defaultPageSize={10} />
//             </DataGrid>
//
//             {/* Добавьте кнопку для сохранения изменений */}
//             <div style={{ marginTop: '10px' }}>
//                 <Button
//                     text="Save Changes"
//                     onClick={handleSaveChanges}
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default TableClients;
