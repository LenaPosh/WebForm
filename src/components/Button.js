import React from 'react';

const Button = ({ action, icon }) => {
    return (
        <button onClick={action}>
            {icon}
        </button>
    );
};

export default Button;