import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

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

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = new URLSearchParams();
            params.append('username', loginData.username);
            params.append('password', loginData.password);

            const response = await axios.post('https://conexuscrypto.co.za/api/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            console.log('Response from server:', response.data);
            setIsAuthenticated(true);

        } catch (error) {
            console.error('Error during authentication:', error.message);
        }
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



