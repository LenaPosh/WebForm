// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import './Header.css';
import { GoPeople } from "react-icons/go";
import { PiHandshakeLight } from "react-icons/pi";
import { IoMdCash } from "react-icons/io";

const Header = () => {
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
        </div>
    );
};

export default Header;
