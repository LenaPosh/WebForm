import React, { useState } from 'react';
import DataGrid, { Column, Pager, Paging, Editing, Button } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './TableClients.css';

const initialData = [
    { key: 1, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 2, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 3, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 4, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 5, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 6, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 7, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 8, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 9, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 10, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 11, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 12, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
    { key: 13, name: "Lena", lastName: "Posh", passportID: 454545454, phoneNumber: 1223555, age: 30 },
];


const TableClients = () => {
    const [data, setData] = useState(initialData);

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
