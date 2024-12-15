// ManagePosts.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import '../../styles/components/posts/ManagePosts.css';
import defaultAvatar from '../../assets/avatars/avatar.jpg';
import PostInteractions from '../common/PostInteractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageAccountAndPosts = () => {
    const { userProfile, updateUserProfile } = useUser();
    const [activeTab, setActiveTab] = useState("Overview");
    const [activeSubTab, setActiveSubTab] = useState("General");
    const [formData, setFormData] = useState({
        displayName: userProfile?.name || "",
        fullName: userProfile?.fullName || "",
        email: userProfile?.email || "",
        phoneNumber: userProfile?.phoneNumber || "",
        address: userProfile?.address || "",
        dateOfBirth: userProfile?.dateOfBirth || "",
        bio: userProfile?.bio || "",
        website: userProfile?.website || "",
        socialMedia: userProfile?.socialMedia || {
            facebook: "",
            twitter: ""
        }
    });

    useEffect(() => {
        if (userProfile) {
            setFormData({
                displayName: userProfile.name || "",
                fullName: userProfile.fullName || "",
                email: userProfile.email || "",
                phoneNumber: userProfile.phoneNumber || "",
                address: userProfile.address || "",
                dateOfBirth: userProfile.dateOfBirth || "",
                bio: userProfile.bio || "",
                website: userProfile.website || "",
                socialMedia: userProfile.socialMedia || {
                    facebook: "",
                    twitter: ""
                }
            });
        }
    }, [userProfile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSocialMediaChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [name]: value
            }
        }));
    };

    const handleSave = async () => {
        try {
            const success = await updateUserProfile(formData);
            if (success) {
                toast.success("Changes saved successfully!");
            } else {
                toast.error("Failed to save changes");
            }
        } catch (error) {
            toast.error("An error occurred while saving changes");
        }
    };

    const samplePost = {
        id: 1,
        title: "What is the best way to cook Dinosaur meat",
        content: "Start by preparing a large grill—after all, dinosaur meat is no small feast! Once you've sourced your prime cut of T-Rex...",
        author: formData.displayName,
        time: "10 hr. ago",
        likes: 0,
        comments: 0,
        commentsList: []
    };

    const renderSaveButton = () => (
        <button 
            className="save-changes-btn"
            onClick={handleSave}
        >
            Save All Changes
        </button>
    );

    return (
        <div className="manage-account-container">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-banner">
                    <div className="profile-avatar-container">
                        <img 
                            src={userProfile?.avatar || defaultAvatar} 
                            alt="Profile" 
                            className="profile-avatar" 
                        />
                    </div>
                    <h1 className="profile-name">{formData.displayName}</h1>
                </div>

                {/* Navigation Tabs */}
                <div className="profile-tabs">
                    <button 
                        className={`tab-btn ${activeTab === "Overview" ? "active" : ""}`}
                        onClick={() => setActiveTab("Overview")}
                    >
                        Overview
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === "Introduction" ? "active" : ""}`}
                        onClick={() => setActiveTab("Introduction")}
                    >
                        Introduction
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === "Posts" ? "active" : ""}`}
                        onClick={() => setActiveTab("Posts")}
                    >
                        Posts
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === "Saves" ? "active" : ""}`}
                        onClick={() => setActiveTab("Saves")}
                    >
                        Saves
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="profile-content">
                {activeTab === "Overview" && (
                    <div className="posts-grid">
                        <div className="post-card">
                            <div className="post-card-header">
                                <img 
                                    src={userProfile?.avatar || defaultAvatar} 
                                    alt={formData.displayName} 
                                    className="post-author-avatar" 
                                />
                                <div className="post-meta">
                                    <h4>{formData.displayName}</h4>
                                    <span>10 hr. ago</span>
                                </div>
                            </div>
                            <h3 className="post-title">{samplePost.title}</h3>
                            <p className="post-excerpt">{samplePost.content}</p>
                            <PostInteractions post={samplePost} />
                        </div>
                    </div>
                )}

                {activeTab === "Introduction" && (
                    <div className="intro-section">
                        <div className="intro-tabs">
                            <button 
                                className={`intro-tab ${activeSubTab === "General" ? "active" : ""}`}
                                onClick={() => setActiveSubTab("General")}
                            >
                                General
                            </button>
                            <button 
                                className={`intro-tab ${activeSubTab === "Contact" ? "active" : ""}`}
                                onClick={() => setActiveSubTab("Contact")}
                            >
                                Contact Information
                            </button>
                            <button 
                                className={`intro-tab ${activeSubTab === "Details" ? "active" : ""}`}
                                onClick={() => setActiveSubTab("Details")}
                            >
                                Details About You
                            </button>
                        </div>

                        <div className="intro-content">
                            {activeSubTab === "General" && (
                                <div className="form-section">
                                    <label>Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        placeholder="Write something about yourself..."
                                    />
                                    {renderSaveButton()}
                                </div>
                            )}

                            {activeSubTab === "Contact" && (
                                <div className="form-section">
                                    <label>Website</label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        placeholder="Your website URL"
                                    />
                                    <label>Social Media</label>
                                    <input
                                        type="url"
                                        name="facebook"
                                        value={formData.socialMedia.facebook}
                                        onChange={handleSocialMediaChange}
                                        placeholder="Facebook profile URL"
                                    />
                                    <input
                                        type="url"
                                        name="twitter"
                                        value={formData.socialMedia.twitter}
                                        onChange={handleSocialMediaChange}
                                        placeholder="Twitter profile URL"
                                    />
                                    {renderSaveButton()}
                                </div>
                            )}

                            {activeSubTab === "Details" && (
                                <div className="form-section">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        placeholder="Your full name"
                                    />
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your email"
                                        readOnly
                                    />
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        placeholder="Your phone number"
                                    />
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="Your address"
                                    />
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleInputChange}
                                    />
                                    {renderSaveButton()}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Create Post Button */}
            <Link to="/create-post" className="create-post-btn">
                + Create Post
            </Link>
        </div>
    );
};

export default ManageAccountAndPosts;