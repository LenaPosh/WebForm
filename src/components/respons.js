import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './table';

const YourComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://reqres.in/api/users');
                console.log('Response from API:', response.data);
                setData(response.data);
            } catch (error) {
                console.error('Ошибка запроса:', error.message);
                console.error('Подробности ошибки:', error);
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!data) {
        return <div>Загрузка...</div>;
    }

    return (
        <div>
            <p>Данные успешно загружены:</p>
            <Table userData={data.data} />
        </div>
    );
};

export default YourComponent;
