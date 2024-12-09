import React, { useState } from 'react';
import axiosClient from './api/axios';
import { Link } from 'react-router-dom';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/forgot-password', { email });
            alert(response.message); // Hiển thị thông báo thành công
        } catch (error) {
            console.error('Forgot password failed:', error);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Find your account</h2>
            <form onSubmit={handleForgotPassword}>
                <input
                    type="text"
                    placeholder="Email or Phone Number"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <button type="submit">Search</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    );
};

export default ForgotPassword;
