import './Header.css';
import Logo from './logo.png';
import {NavLink} from "react-router-dom";


const TopHeaderSign = () => {

    return (
        <div className="header">
            <NavLink to="/">
                <img className="logo-text" alt="" src={Logo} />
            </NavLink>
        </div>
    )

};

export default TopHeaderSign;
