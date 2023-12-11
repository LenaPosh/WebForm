import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const SignInForm = ({ handleSignIn }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [isRegistration, setRegistration] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isPasswordValid = (password) => {
        return /^(?=.*[0-9]{5,})(?=.*[a-zA-Z]).*$/.test(password);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

    const handleFormToggle = () => {
        setRegistration(!isRegistration);
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();
        if (isRegistration) {
            // Логика для отправки данных на сервер для регистрации
            if (loginData.password === passwordConfirmation && isPasswordValid(loginData.password)) {
                console.log('Регистрация:', loginData);
                // После успешной регистрации
                setIsAuthenticated(true);
            } else {
                console.log('Invalid password or passwords do not match');
            }
        } else {
            // Логика для отправки данных на сервер для аутентификации
            console.log('Вход:', loginData);
            // После успешной аутентификации
            setIsAuthenticated(true);
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
                {isRegistration && (
                    <div>
                        <input
                            type="password"
                            name="passwordConfirmation"
                            placeholder="Confirm Password"
                            className="form-input"
                            value={passwordConfirmation}
                            onChange={handlePasswordConfirmationChange}
                        />
                        {!isPasswordValid(loginData.password) && (
                            <p style={{ color: 'red' }}>Password must contain at least 5 digits and 1 letter</p>
                        )}
                    </div>
                )}
                <button type="submit" className="form-button">
                    {isRegistration ? 'Sign Up' : 'Sign In'}
                </button>
            </form>
            <p className="form-footer">
                {isRegistration ? 'Already registered? ' : 'Not registered? '}
                <span onClick={handleFormToggle}>
                    {isRegistration ? 'Sign In' : 'Sign Up'}
                </span>
            </p>
        </div>
    );
};

export default SignInForm;
