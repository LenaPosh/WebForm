import React, { useState } from 'react';
import axios from 'axios';

const AddClientForm = ({ onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        passportID: '',
        comments: ''
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

export default AddClientForm;


