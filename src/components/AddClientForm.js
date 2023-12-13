
import React, { useState } from 'react';
import axios from 'axios';

const AddClientForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        passportID: '',
        comments: '',
        date: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const formattedData = {
                name: formData.name,
                last_name: formData.lastName,
                passportID: formData.passportID,
                comments: formData.comments,
                date_added: formData.date,
                phone: formData.phone
            };


            await axios.post('http://18.215.164.227:8001/client', formattedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            onSave(formData);

            setFormData({
                name: '',
                lastName: '',
                passportID: '',
                comments: '',
                date: '',
                phone: ''
            });

            console.log('Попытка сохранить нового клиента:', formData);
        } catch (error) {
            console.error('Error while saving a new client:', error.message);
        }
    };

    return (
        <div className="deal-form-container">
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
            <label>
                Passport ID:
                <input type="text" name="passportID" value={formData.passportID} onChange={handleChange} />
            </label>
            <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </label>
            <label>
                Phone:
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <label>
                Comments:
                <textarea name="comments" value={formData.comments} onChange={handleChange} />
            </label>
            <div className="buttons-container">
                <button onClick={handleSave} style={{ backgroundColor: '#4b296b' }}>
                    Save
                </button>
            </div>
        </div>
    );
};

const AddClientButton = ({ onAddClick }) => (
    <button onClick={onAddClick} style={{ backgroundColor: '#4b296b', color: 'white', margin: '20px', marginLeft: '20px',   }}>
        Add Client
    </button>
);

const AppClients = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleAddClick = () => {
        setIsFormVisible(true);
    };

    const handleFormSave = async (formData) => {
        try {
            // Логика сохранения данных на сервере (вы можете использовать ваш код сохранения)

            console.log('Форма успешно сохранена:', formData);

            // После успешного сохранения скрываем форму
            setIsFormVisible(false);
        } catch (error) {
            console.error('Ошибка при сохранении формы:', error.message);
        }
    };

    return (
        <div>
            {isFormVisible ? (
                <AddClientForm onSave={handleFormSave} />
            ) : (
                <AddClientButton onAddClick={handleAddClick} />
            )}
        </div>
    );
};

export default AppClients;
//
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// const ClientTable = ({ data, onDelete, onEdit }) => {
//     return (
//         <table border="1" style={{ marginTop: '20px' }}>
//             <thead>
//             <tr>
//                 <th>Name</th>
//                 <th>Last Name</th>
//                 <th>Passport ID</th>
//                 <th>Comments</th>
//                 <th>Actions</th>
//             </tr>
//             </thead>
//             <tbody>
//             {data.map((client) => (
//                 <tr key={client.id}>
//                     <td>{client.name}</td>
//                     <td>{client.last_name}</td>
//                     <td>{client.passportID}</td>
//                     <td>{client.comments}</td>
//                     <td>
//                         <button onClick={() => onEdit(client)}>Edit</button>
//                         <button onClick={() => onDelete(client.id)}>Delete</button>
//                     </td>
//                 </tr>
//             ))}
//             </tbody>
//         </table>
//     );
// };
//
// const AddClientForm = ({ onSave }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         lastName: '',
//         passportID: '',
//         comments: '',
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({ ...prevData, [name]: value }));
//     };
//
//     const handleSave = async () => {
//         try {
//             const formattedData = {
//                 name: formData.name,
//                 last_name: formData.lastName,
//                 passportID: formData.passportID,
//                 comments: formData.comments,
//             };
//
//             const response = await axios.post('http://18.215.164.227:8001/client', formattedData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//
//             onSave(response.data);
//
//             setFormData({
//                 name: '',
//                 lastName: '',
//                 passportID: '',
//                 comments: '',
//             });
//
//             console.log('Попытка сохранить нового клиента:', response.data);
//         } catch (error) {
//             console.error('Error while saving a new client:', error.message);
//         }
//     };
//
//     return (
//         <div className="deal-form-container">
//             <label>
//                 Name:
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} />
//             </label>
//             <label>
//                 Last Name:
//                 <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
//             </label>
//             <label>
//                 Passport ID:
//                 <input type="text" name="passportID" value={formData.passportID} onChange={handleChange} />
//             </label>
//             <label>
//                 Comments:
//                 <textarea name="comments" value={formData.comments} onChange={handleChange} />
//             </label>
//             <div className="buttons-container">
//                 <button onClick={handleSave} style={{ backgroundColor: '#4b296b' }}>
//                     Save
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// const AppClients = () => {
//     const [data, setData] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://18.215.164.227:8001/clients');
//             setData(response.data.data);
//         } catch (error) {
//             console.error('Error while fetching data:', error.message);
//         }
//     };
//
//     const handleAddClick = () => {
//         setIsFormVisible(true);
//     };
//
//     const handleFormSave = (newClient) => {
//         setData((prevData) => [...prevData, newClient]);
//         setIsFormVisible(false);
//     };
//
//     const handleEdit = (client) => {
//         // Реализуйте логику редактирования, если необходимо
//     };
//
//     const handleDelete = async (clientId) => {
//         try {
//             await axios.delete(`http://18.215.164.227:8001/client/${clientId}`);
//             setData((prevData) => prevData.filter((client) => client.id !== clientId));
//         } catch (error) {
//             console.error('Error while deleting a client:', error.message);
//         }
//     };
//
//     return (
//         <div>
//             <button onClick={handleAddClick} style={{ backgroundColor: '#4b296b', color: 'white', margin: '10px' }}>
//                 Add Client
//             </button>
//
//             {isFormVisible ? (
//                 <AddClientForm onSave={handleFormSave} />
//             ) : (
//                 <ClientTable data={data} onDelete={handleDelete} onEdit={handleEdit} />
//             )}
//         </div>
//     );
// };
//
// export default AppClients;

