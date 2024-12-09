import React, { useState } from 'react';
import axiosClient from './api/axios';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css';
import googleIcon from '../assets/googleIcon.svg';
import outlook from '../assets/outlook.png'

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        username: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/register', formData);
            alert('Sign up successful!');
        } catch (error) {
            console.error('Sign up failed:', error);
        }
    };
    const handleGoogleLogin = () => {
        // Logic for Google login integration
        console.log('Google login triggered');
    };

    const handleOutlookLogin = () => {
        // Logic for phone number login (could integrate with OTP, etc.)
        console.log('Outlook login triggered');
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h2>Sign up for MyBG</h2>
                <form onSubmit={handleSignUp}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={formData.email}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={formData.password}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleInputChange}
                        value={formData.confirmPassword}
                        required
                    />
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleInputChange}
                        value={formData.fullName}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleInputChange}
                        value={formData.username}
                        required
                    />
                    <button type="submit">Sign up</button>
                </form>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </div>
            <div className="login-right">
                <div className="divider">OR</div>

                {/* Google Login */}
                <button onClick={handleGoogleLogin} className="google-login-button">
                <img src={googleIcon} alt="Google Icon" className="google-icon" width="24" />
                    Continue with Google
                </button>

                {/* Phone Login */}
                <button onClick={handleOutlookLogin} className="outlook-login-button">
                    <img src={outlook} alt="Outlook Icon" className="outlook-icon" width="24" />
                    Continue with Outlook
                </button>
            </div>
        </div>
    );
};

export default SignUp;
