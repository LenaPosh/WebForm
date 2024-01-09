import React, { useState } from 'react';
import axios from 'axios';

const SignInComponent = ({ handleSignIn }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = new URLSearchParams();
            params.append('username', loginData.username);
            params.append('password', loginData.password);

            const response = await axios.post('https://conexuscrypto.co.za/api/login', {
                username: loginData.username,
                password: loginData.password
            });


            console.log('Response from server:', response.data);

            // Вызывайте handleSignIn с данными, возвращаемыми сервером, если это необходимо
            handleSignIn(response.data);

        } catch (error) {
            console.error('Error during authentication:', error.message);
        }
    };

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

export default SignInComponent;


