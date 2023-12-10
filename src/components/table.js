import React from 'react';

const Table = ({ userData }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Avatar</th>
            </tr>
            </thead>
            <tbody>
            {Array.isArray(userData) ? (
                userData.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>
                            <img
                                src={user.avatar}
                                alt={`Avatar of ${user.first_name}`}
                                style={{ width: '50px', height: '50px' }}
                            />
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5">Нет данных</td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default Table;
