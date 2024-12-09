import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ManageAccount from './components/ManageAccount';
import ManagePosts from './components/ManagePosts';
import ForgotPassword from './components/ForgotPassword';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileName, setProfileName] = useState("Kien Phan");

    console.log('App component rendered');
    return (
        <Router>
            {!isLoggedIn && (
                <nav>
                    <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link>
                </nav>
            )}
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/manage-account"
                    element={<ManageAccount profileName={profileName} setProfileName={setProfileName} />}
                />
                <Route
                    path="/posts"
                    element={<ManagePosts profileName={profileName} />}
                />
                <Route
                    path="/create-post"
                    element={<ManagePosts profileName={profileName} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
