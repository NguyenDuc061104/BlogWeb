import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ManageAccount.css';
import Logo from '../assets/logo.png';
import Avatar from '../assets/avatar.svg';

const ManageAccount = ({ profileName, setProfileName }) => {
    const [displayName, setDisplayName] = useState(profileName);
    const [fullName, setFullName] = useState("Phan Huy Kiên");
    const [password, setPassword] = useState("huykien2004");
    const [email, setEmail] = useState("huykien283@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("0946350603");
    const [address, setAddress] = useState("Đường Gò Dưa, Hiệp Bình Phước, Thủ Đức");
    const [dateOfBirth, setDateOfBirth] = useState("2004-03-28");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const handleSaveAllChanges = () => {
        setProfileName(displayName);

        console.log("Saved changes:");
        console.log({
            profileName: displayName,
            fullName,
            password,
            email,
            phoneNumber,
            address,
            dateOfBirth,
        });
        alert("Changes saved successfully!");
    };

    const handleSavePassword = () => {
        setPassword(newPassword);
        setIsUpdatingPassword(false);
        alert("Password updated successfully!");
    };

    const handleSaveEmail = () => {
        setEmail(newEmail);
        setIsUpdatingEmail(false);
        alert("Email updated successfully!");
    };

    return (
        <div className="manage-account-container">
            {/* Navigation */}
            <div className="manage-account-navigation">
                <Link to="/manage-account">Introduction</Link>
                <Link to="/posts">Posts</Link>
            </div>

            {/* Avatar and Profile Name */}
            <div className="avatar-section">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="profile-picture">
                    <img src={Avatar} alt="Profile" />
                </div>
                <h2 className="profile-name">{profileName}</h2>
            </div>

            {/* Main Section */}
            <div className="main-section">
                {/* Update Information Section */}
                <div className="update-section">
                    <h3>Update Information</h3>
                    <button onClick={() => { setIsUpdatingPassword(true); setIsUpdatingEmail(false); }}>Update Password</button>
                    <button onClick={() => { setIsUpdatingEmail(true); setIsUpdatingPassword(false); }}>Update Email</button>
                </div>

                {/* Basic Information Section */}
                {!isUpdatingPassword && !isUpdatingEmail && (
                    <div className="basic-info-section">
                        <h3>Basic Information</h3>
                        <form className="info-container">
                            {/* Display Name */}
                            <div className="info-item">
                                <label>Display Name</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder="Enter display name"
                                />
                            </div>
                            {/* Full Name */}
                            <div className="info-item">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {/* Password */}
                            <div className="info-item">
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    readOnly
                                    placeholder="Password cannot be changed here"
                                />
                            </div>
                            {/* Email */}
                            <div className="info-item">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    readOnly
                                    placeholder="Email cannot be changed here"
                                />
                            </div>
                            {/* Phone Number */}
                            <div className="info-item">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            {/* Address */}
                            <div className="info-item">
                                <label>Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter your address"
                                />
                            </div>
                            {/* Date of Birth */}
                            <div className="info-item">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                />
                            </div>
                            {/* Save Changes */}
                            <button
                                type="button"
                                className="save-button"
                                onClick={handleSaveAllChanges}
                            >
                                Save All Changes
                            </button>
                        </form>
                    </div>
                )}

                {/* Section Update Password */}
                {isUpdatingPassword && (
                    <div className="update-password-section">
                        <h3>Update Password</h3>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                        {/* Bao bọc các nút trong một container */}
                        <div className="button-container">
                            <button className="save-password-section" onClick={handleSavePassword}>Save Password</button>
                            <button className="cancel-password-section" onClick={() => setIsUpdatingPassword(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                {/* Section Update Email */}
                {isUpdatingEmail && (
                    <div className="update-email-section">
                        <h3>Update Email</h3>
                        <input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Enter new email"
                        />
                        <div className="button-container">
                            <button className="save-email-section" onClick={handleSaveEmail}>Save Email</button>
                            <button className="cancel-email-section" onClick={() => setIsUpdatingEmail(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAccount;
