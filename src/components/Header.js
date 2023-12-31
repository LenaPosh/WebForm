import React, { useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import './Header.css';
import { GoPeople } from 'react-icons/go';
import { PiHandshakeLight } from 'react-icons/pi';
import { IoMdCash } from 'react-icons/io';
import Logo from './logo.png';
import SignInComponent from "./SignInComponent";
import { GiCash } from "react-icons/gi";
import { BsBank2 } from "react-icons/bs";

const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSignIn = (userData) => {
        // логика для отправки данных на сервер для аутентификации
        console.log('Вход:', userData);
        // После успешной аутентификации
        setIsAuthenticated(true);
    };

    return (
        <div className="header">
            <NavLink to="/">
                <img className="logo-text" alt="" src={Logo} />
            </NavLink>
            <NavLink to="/clients" className="menu-link" activeClassName="activeclassname">
                <GoPeople className="icon" />
                <span className="menu-link-text">Clients</span>
            </NavLink>
            <NavLink to="/deals" className="menu-link" activeClassName="activeclassname">
                <PiHandshakeLight className="icon" />
                <span className="menu-link-text">Deals</span>
            </NavLink>
            <NavLink to="/cash" className="menu-link" activeClassName="activeclassname">
                <IoMdCash className="icon" />
                <span className="menu-link-text">Cash</span>
            </NavLink>
            <NavLink to="/balances" className="menu-link" activeClassName="activeclassname">
                <GiCash className="icon" />
                <span className="menu-link-text">Balances</span>
            </NavLink>
            <NavLink to="/loans" className="menu-link" activeClassName="activeclassname">
                <BsBank2 className="icon" />
                <span className="menu-link-text">Loans</span>
            </NavLink>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        {isAuthenticated ? (
                            <Navigate to="/clients" />
                        ) : (
                            <SignInComponent handleSignIn={handleSignIn} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;

