import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/ManageAccount.css';
import '../styles/ManagePosts.css';
import Avatar from '../assets/avatar.svg';
import Logo from '../assets/logo.png';
import HeartIcon from '../assets/heart.png';
import CommentIcon from '../assets/chat-bubble.png';
import ShareIcon from '../assets/share.png';

const ManageAccountAndPosts = ({ profileName}) => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [displayName, setDisplayName] = useState(profileName);
    const [fullName, setFullName] = useState("Phan Huy Kiên");
    const [email] = useState("huykien283@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("0946350603");
    const [address, setAddress] = useState("Đường Gò Dưa, Hiệp Bình Phước, Thủ Đức");
    const [dateOfBirth, setDateOfBirth] = useState("2004-03-28");

    // const handleSaveAllChanges = () => {
    //     setProfileName(displayName);
    //     console.log("Saved changes:");
    //     console.log({
    //         profileName: displayName,
    //         fullName,
    //         password,
    //         email,
    //         phoneNumber,
    //         address,
    //         dateOfBirth,
    //     });
    //     alert("Changes saved successfully!");
    // };

    const renderTabContent = () => {
        console.log("Current activeTab:", activeTab);
        if (activeTab === "Overview") {
            return (
                <div className="post-list">
                    <div className="post-item">
                        <div className="post-header">
                            <img src={Avatar} alt="Author" className="post-avatar" />
                            <div className="post-info">
                                <h4>{profileName}</h4>
                                <p>10 hr. ago</p>
                            </div>
                        </div>
                        <h3 className="post-title">Overview: What is the best way to cook Dinosaur meat</h3>
                        <p className="post-content">
                            Start by preparing a large grill—after all, dinosaur meat is no small feast! Once you've sourced your prime cut of T-Rex or Brontosaurus, season generously with salt, pepper, and your favorite herbs...
                        </p>

                        {/* Các button: Like, Comment, Share */}
                        <div className="post-actions">
                            <button className="action-button">
                                <img src={HeartIcon} alt="Like" className="action-icon" />
                                Like
                            </button>
                            <button className="action-button">
                                <img src={CommentIcon} alt="Comment" className="action-icon" />
                                Comment
                            </button>
                            <button className="action-button">
                                <img src={ShareIcon} alt="Share" className="action-icon" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            );
        }else if (activeTab === "Introduction") {
            return (
                <div className="basic-info-section">
                    <h3>General Information</h3>
                    <form className="info-container">
                        {/* Overview Section */}
                        <div className="general-section">
                            <button type="button"
                                onClick={() => {console.log("Clicked General"); setActiveTab("General")} }
                                className="tab-button"
                            >
                                General
                            </button>
                            {activeTab === "General" && (
                                <div className="general-info-item">
                                    <label>General</label>
                                    <textarea
                                        placeholder="Write a brief general about yourself"
                                    />
                                </div>
                            )}
                        </div>
        
                        {/* Contact Information */}
                        <div className="contact-info-section">
                            <button type="button"
                                onClick={() => {
                                    console.log("Clicked Contact");
                                    setActiveTab("Contact Information")
                                }} 
                                className="tab-button"
                            >
                                Contact Information
                            </button>
                            {activeTab === "Contact Information" && (
                                <>
                                    <div className="contact-info-item">
                                        <label>Website</label>
                                        <input
                                            type="url"
                                            placeholder="Enter your website link"
                                        />
                                    </div>
                                    <div className="contact-info-item">
                                        <label>Social Media Links</label>
                                        <div className="social-media-links">
                                            <input
                                                type="url"
                                                placeholder="Add a social media link"
                                            />
                                            <input
                                                type="url"
                                                placeholder="Add another social media link"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
        
                        {/* Details About You */}
                        <div className="details-section">
                            <button type="button"
                                onClick={() => {console.log("Clicked Details"); setActiveTab("Details about You")}} 
                                className="tab-button"
                            >
                                Details about You
                            </button>
                            {activeTab === "Details about You" && (
                                <>
                                    <div className="details-info-item">
                                        <label>Nickname</label>
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            placeholder="Enter display name"
                                        />
                                    </div>
                                    <div className="details-info-item">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="general-info-item">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            readOnly
                                            placeholder="Email cannot be changed here"
                                        />
                                    </div>
                                    <div className="general-info-item">
                                        <label>Phone Number</label>
                                        <input
                                            type="text"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div className="general-info-item">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Enter your address"
                                        />
                                    </div>
                                    <div className="details-info-item">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            );                    
        } else if (activeTab === "Posts") {
            return (
                <div className="post-list">
                    <div className="post-item">
                        <div className="post-header">
                            <img src={Avatar} alt="Author" className="post-avatar" />
                            <div className="post-info">
                                <h4>{profileName}</h4>
                                <p>5 hr. ago</p>
                            </div>
                        </div>
                        <h3 className="post-title">Posts: How to raise a baby T-Rex</h3>
                        <p className="post-content">
                            Raising a baby T-Rex is no small feat. Start with a secure enclosure and a steady supply of meat. Train your dino with positive reinforcement for a lifetime of loyalty...
                        </p>

                        {/* Các button: Like, Comment, Share */}
                        <div className="post-actions">
                            <button className="action-button">
                                <img src={HeartIcon} alt="Like" className="action-icon" />
                                Like
                            </button>
                            <button className="action-button">
                                <img src={CommentIcon} alt="Comment" className="action-icon" />
                                Comment
                            </button>
                            <button className="action-button">
                                <img src={ShareIcon} alt="Share" className="action-icon" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        else if (activeTab === "Saves") {
            return (
                <div className="post-list">
                    <div className="post-item">
                        <div className="post-header">
                            <img src={Avatar} alt="Author" className="post-avatar" />
                            <div className="post-info">
                                <h4>{profileName}</h4>
                                <p>1 day ago</p>
                            </div>
                        </div>
                        <h3 className="post-title">Saves: Best Dinosaur Tours in Jurassic Park</h3>
                        <p className="post-content">
                            Discover the best tours to see majestic dinosaurs up close! From the safety of armored jeeps to walking tours with guides, explore the wild beauty of Jurassic Park...
                        </p>

                        {/* Các button: Like, Comment, Share */}
                        <div className="post-actions">
                            <button className="action-button">
                                <img src={HeartIcon} alt="Like" className="action-icon" />
                                Like
                            </button>
                            <button className="action-button">
                                <img src={CommentIcon} alt="Comment" className="action-icon" />
                                Comment
                            </button>
                            <button className="action-button">
                                <img src={ShareIcon} alt="Share" className="action-icon" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="manage-account-posts-container">
            {/* Navigation chính
            <div className="navigation">
                <Link to='/manage-account' className="navigation-link">Introduction</Link>
                <Link to='/posts' className="navigation-link active">Posts</Link>
            </div> */}

            {/* Avatar and Profile Name */}
            <div className="profile-section">
                <div className="logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="profile-picture">
                    <img src={Avatar} alt="Profile" />
                </div>
                <h2 className="profile-name">{profileName}</h2>
            </div>

            {/* Tabs nhỏ: Overview, General, Posts */}
            <div className="tabs-navigation">
                <button onClick={() => setActiveTab("Overview")} className={`tab-link ${activeTab === "Overview" ? "active" : ""}`}>
                    Overview
                </button>
                <button onClick={() => setActiveTab("Introduction")} className={`tab-link ${activeTab === "Introduction" ? "active" : ""}`}>
                    Introduction
                </button>
                <button onClick={() => setActiveTab("Posts")} className={`tab-link ${activeTab === "Posts" ? "active" : ""}`}>
                    Posts
                </button>
                <button onClick={() => setActiveTab("Saves")} className={`tab-link ${activeTab === "Saves" ? "active" : ""}`}>
                    Saves
                </button>
            </div>

            {/* Nội dung tab */}
            <div className="tab-content">
                {renderTabContent()}
            </div>

            {/* Post List Section */}
            <div className="post-header">
                <Link to='/create-post' className="create-post-button">+ Create Post</Link>
            </div>
        </div>
    );
};

export default ManageAccountAndPosts;