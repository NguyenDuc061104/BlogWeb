// HomeSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/layout/HomeSidebar.css';
import { useUser } from '../contexts/UserContext';
import defaultAvatar from '../assets/user.png';
import friends from '../assets/friends.png';
import group from '../assets/group.png';

const HomeSidebar = () => {
  const { userProfile } = useUser();

  const menuItems = [
    {
      id: 1,
      title: "Friend",
      icon: friends,
      type: "menu"
    },
    {
      id: 2,
      title: "Group",
      icon: group,
      type: "menu"
    },
    {
      id: 3,
      title: "Saved",
      icon: "far fa-bookmark",
      type: "menu"
    },
    {
      id: 4,
      title: "Feed",
      icon: "far fa-newspaper",
      type: "menu"
    }
  ];

  return (
    <div className="sidebar">
      <Link to="/personal" className="profile-section">
        <img 
          src={userProfile?.avatar || defaultAvatar} 
          alt="Profile" 
          className="large-user-avatar" 
        />
      </Link>

      <div className="sidebar-menu">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <i className={`${item.icon} menu-icon`} />
            <span className="menu-text">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSidebar;