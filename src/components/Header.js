// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <NavLink to="/clients" className="menu-link" activeClassName="active">
                <span className="menu-link-text">Clients</span>
            </NavLink>
            <NavLink to="/deals" className="menu-link" activeClassName="active">
                <span className="menu-link-text">Deals</span>
            </NavLink>
            <NavLink to="/cash" className="menu-link" activeClassName="active">
                <span className="menu-link-text">Cash</span>
            </NavLink>
        </div>
    );
};

export default Header;
