import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const SignInForm = ({ handleSignIn }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        // Логика для отправки данных на сервер для аутентификации
        console.log('Вход:', loginData);
        // После успешной аутентификации
        setIsAuthenticated(true);
    };

    if (isAuthenticated) {
        return <Navigate to="/clients" />;
    }

    return (
        <div className="form-container" style={{ backgroundColor: 'rgba(248,200,207,0.59)', padding: '20px', borderRadius: '8px' }}>
            <form onSubmit={handleSignInSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-input"
                    value={loginData.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-input"
                    value={loginData.password}
                    onChange={handleInputChange}
                />
                <button type="submit" className="form-button">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignInForm;

