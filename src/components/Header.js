
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { GoPeople } from 'react-icons/go';
import { PiHandshakeLight } from 'react-icons/pi';
import { IoMdCash } from 'react-icons/io';

const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });
    const [isRegistration, setRegistration] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleFormToggle = () => {
        setRegistration(!isRegistration);
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        console.log('Вход:', loginData);
        // Добавьте здесь логику для отправки данных на сервер для аутентификации
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        // Проверка на совпадение паролей
        if (loginData.password === passwordConfirmation) {
            console.log('Регистрация:', loginData);
            // Добавьте здесь логику для отправки данных на сервер для регистрации
        } else {
            console.log('Passwords do not match');
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setRegistration(false);
    };

    return (
        <div className="header">
            <NavLink to="/clients" className="menu-link" activeClassName="active">
                <GoPeople className="icon" />
                <span className="menu-link-text">Clients</span>
            </NavLink>
            <NavLink to="/deals" className="menu-link" activeClassName="active">
                <PiHandshakeLight className="icon" />
                <span className="menu-link-text">Deals</span>
            </NavLink>
            <NavLink to="/cash" className="menu-link" activeClassName="active">
                <IoMdCash className="icon" />
                <span className="menu-link-text">Cash</span>
            </NavLink>

            <div className="menu-link sign-in-button" onClick={openModal}>
                Sign In
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={closeModal}>
                &times;
            </span>
                        <div className="form-container">
                            <form onSubmit={isRegistration ? handleSignUp : handleSignIn}>
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
                                {isRegistration && (  // Добавлено условие, чтобы инпут был видим только при регистрации
                                    <input
                                        type="password"
                                        name="passwordConfirmation"
                                        placeholder="Confirm Password"
                                        className="form-input"
                                        value={passwordConfirmation}
                                        onChange={handlePasswordConfirmationChange}
                                    />
                                )}
                                <button type="submit" className="form-button">
                                    {isRegistration ? 'Sign Up' : 'Sign In'}
                                </button>
                            </form>
                            <p className="form-footer">
                                {isRegistration
                                    ? 'Already registered? '
                                    : "Not registered? "}
                                <span onClick={handleFormToggle}>
                        {isRegistration ? 'Sign In' : 'Sign Up'}
                    </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;

