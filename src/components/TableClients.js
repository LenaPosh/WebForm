import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Pager, Paging, Editing, Button } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './TableClients.css';
import axios from 'axios';

const TableClients = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://reqres.in/api/users');

                const userData = response.data.data.map((user) => ({
                    key: user.id,
                    name: user.first_name,
                    lastName: user.last_name,
                    passportID: user.id,
                    phoneNumber: '',
                    age: '',
                    ...user,
                }));
                setData(userData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error.message);
            }
        };

        fetchData();
    }, []);


    const addRow = () => {
        const newData = [...data, {}];
        setData(newData);
    };

    const deleteRow = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
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
                <Column dataField="phoneNumber" caption="Phone number" />
                <Column dataField="age" caption="Age" />
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
        </div>
    );
};

export default TableClients;
