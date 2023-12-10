// SignInPage.jsx
import React from 'react';
import SignInForm from '../SignInForm';
import TopHeaderSign from "../components/TopHeaderSign";
import './SignInPage.css';

const SignInPage = ({ handleSignIn }) => {
    return (
        <>
            <TopHeaderSign />
            <div className="signin-page-container">
                <div className="signin-page">
                    <h2>To use the system, authorization is required</h2>
                    <SignInForm handleSignIn={handleSignIn} />
                </div>
            </div>
        </>
    );
};

export default SignInPage;
