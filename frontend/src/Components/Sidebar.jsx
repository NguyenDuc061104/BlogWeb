import React, { useState } from "react";
import "./../styles/Sidebar.css";

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("Friend");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const menuItems = [
    { icon: "fas fa-user-friends", label: "Friend" },
    { icon: "fas fa-users", label: "Group" },
    { icon: "fas fa-video", label: "Video" },
    { icon: "fas fa-bookmark", label: "Saved" },
    { icon: "fas fa-rss", label: "Feed" },
  ];

  return (
    <nav className="sidebar">
      <div className="profile">
        <div className="avatar"></div>
        <span className="user-name">Đức Nguyễn</span>
      </div>
      <ul className="menu">
        {menuItems.map((item) => (
          <li
            key={item.label}
            className={activeMenu === item.label ? "active" : ""}
            onClick={() => handleMenuClick(item.label)}
          >
            <i className={item.icon}></i> {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
