import React, { useState } from 'react';
import axiosClient from './api/axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import googleIcon from '../assets/googleIcon.svg';
import outlook from '../assets/outlook.png';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/login', formData);
            // Lưu token và chuyển hướng
            localStorage.setItem('token', response.token);
            setIsLoggedIn(true);
            navigate('/manage-account');
        } catch (error) {
            console.error('Login failed:', error);
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
                <h2>Log in to MyBG</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username or Email"
                        onChange={handleInputChange}
                        value={formData.username}
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
                    <button type="submit">Log in</button>
                </form>

                <div className="options">
                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <Link to="/forgot-password">Forgot password?</Link>
                </div>

                <p>Don't have an account? <Link to="/signup" className='signup'>Sign up</Link></p>
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

export default Login;
