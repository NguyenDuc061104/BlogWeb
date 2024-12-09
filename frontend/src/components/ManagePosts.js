import React, { useState } from 'react';
import '../styles/ManagePosts.css';
import Avatar from '../assets/avatar.svg';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import HeartIcon from '../assets/heart.png'; // Icon like
import CommentIcon from '../assets/chat-bubble.png'; // Icon comment
import ShareIcon from '../assets/share.png'; // Icon share

const ManagePosts = ({ profileName }) => {
    const [activeTab, setActiveTab] = useState("Overview");

    const renderTabContent = () => {
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
        } else if (activeTab === "Saves") {
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
        <div className="manage-post-container">
            {/* Navigation chính */}
            <div className="navigation">
                <Link to='/manage-account' className="navigation-link">Introduction</Link>
                <Link to='/posts' className="navigation-link active">Posts</Link>
            </div>

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

            {/* Tabs nhỏ: Overview, Posts, Saves */}
            <div className="tabs-navigation">
                <button onClick={() => setActiveTab("Overview")} className={`tab-link ${activeTab === "Overview" ? "active" : ""}`}>
                    Overview
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

export default ManagePosts;
