// import React, { useState } from 'react';
//
// const SignInComponent = ({ handleSignIn }) => {
//     const [loginData, setLoginData] = useState({
//         username: '',
//         password: '',
//     });
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setLoginData({
//             ...loginData,
//             [name]: value,
//         });
//     };
//
//     const handleSignInSubmit = (e) => {
//         e.preventDefault();
//         // Логика для отправки данных на сервер для аутентификации
//         console.log('Вход:', loginData);
//         // После успешной аутентификации вызываем handleSignIn
//         handleSignIn(loginData);
//     };
//
//     return (
//         <div className="form-container" style={{ backgroundColor: 'rgba(248,200,207,0.59)', padding: '20px', borderRadius: '8px' }}>
//             <form onSubmit={handleSignInSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     className="form-input"
//                     value={loginData.username}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     className="form-input"
//                     value={loginData.password}
//                     onChange={handleInputChange}
//                 />
//                 <button type="submit" className="form-button">
//                     Sign In
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default SignInComponent;


import React, { useState } from 'react';
import axios from 'axios';

const SignInComponent = ({ handleSignIn }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
    });

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
            const response = await axios.post('', loginData);

            console.log('Response from server:', response.data);


            handleSignIn(loginData);
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
