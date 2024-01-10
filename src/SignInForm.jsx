import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const SignInForm = ({ handleSignIn }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        if (!loginData.username || !loginData.password) {
            setErrorMessage('Please log in first');
            return;
        }
        setErrorMessage('');

        try {
            const params = new URLSearchParams();
            params.append('username', loginData.username);
            params.append('password', loginData.password);

            const response = await axios.post('https://conexuscrypto.co.za/api/login', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            console.log(response.data)
            if (response.data && response.data && response.data.token) {
                console.log('Response from server:', response.data);

                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
            } else {
                console.error('Authentication failed, no token received');
            }

        } catch (error) {
            if (error.response) {
                console.error('Server Response:', error.response.data);
            } else if (error.request) {
                console.error('No response:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    }


    if (isAuthenticated) {
        return <Navigate to="/clients" />;
    }

    return (
        <div className="form-container" style={{ backgroundColor: 'rgba(248,200,207,0.59)', padding: '20px', borderRadius: '8px' }}>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSignInSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-input" style={{width: '260px'}}
                    value={loginData.username}
                    onChange={handleInputChange}
                />
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        className="form-input" style={{width: '260px'}}
                        value={loginData.password}
                        onChange={handleInputChange}
                    />
                    <span onClick={togglePasswordVisibility} style={{ position: 'absolute', right: '10px', fontSize: '10px', top: '38%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'gray' }}>
                        {showPassword ? 'Hide' : 'Show' }
                    </span>
                </div>
                <button type="submit" className="form-button">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignInForm;



