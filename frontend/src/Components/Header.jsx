import React from "react";
import "./../styles/Header.css";

function Header() {
  const handleNavClick = (nav) => {
    alert(`Bạn đã chọn: ${nav}`);
  };

  const navItems = [
    { icon: "fas fa-home", label: "Home" },
    { icon: "fas fa-search", label: "Search" },
    { icon: "fas fa-bell", label: "Notification" },
    { icon: "fas fa-user", label: "Profile" },
  ];

  return (
    <header className="header">
      <ul className="nav">
        {navItems.map((item) => (
          <li key={item.label} onClick={() => handleNavClick(item.label)}>
            <i className={item.icon}></i> {item.label}
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;
