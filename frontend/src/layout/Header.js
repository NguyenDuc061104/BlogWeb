import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import defaultAvatar from '../assets/avatars/avatar.jpg';
import Logo from '../assets/avatars/logo.png';
import '../styles/layout/Header.css';
import Avatar from '../components/common/Avatar';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { userProfile, clearUserProfile } = useUser();

  const handleLogout = () => {
    clearUserProfile();
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <img src={Logo} alt="BlogWeb Logo" className="logo-image" />
        </Link>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search for posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {isLoggedIn ? (
        <div className="header-right">
          <Link to="/create-post" className="create-post-btn">
            Create Post
          </Link>
          <div className="user-menu" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="avatar">
              <Avatar 
                avatarUrl={userProfile?.avatar || defaultAvatar} 
                name={userProfile?.name} 
              />
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/personal">Profile</Link>
                <Link to="/settings">Settings</Link>
                <button onClick={handleLogout} className="logout-btn">
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="header-right">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      )}
    </header>
  );
};

export default Header;