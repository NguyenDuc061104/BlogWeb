import React from 'react';
import '../styles/sidebar.css'; 

import { Link } from 'react-router-dom';

const Sidebar = () => {
  const followedUsers = ["Nguyen An Duc", "Nguyen An Duck", "Nguyen Ant Duc"];

  return (
    <div className="sidebar">
      <h3>Your Followed</h3>
      <ul>
        {followedUsers.map((user, index) => (
          <li key={index}>
            <div className="circle"></div>
            <Link to={`/user/${user}`}>{user}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
