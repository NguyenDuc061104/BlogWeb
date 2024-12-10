import React from 'react';
import '../styles/header.css'; 
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">My Blog</div>
      <div className="search-bar">
        <input type="text" placeholder="Search ..."/>
      </div>
      <Link to="/user">
        <div className="user-avatar"></div>
      </Link>
    </header>
  );
};

export default Header;
