import React from "react";

const Header = () => (
  <header>
    <div className="profile">
      <div className="profile-icon"></div>
      <span className="profile-name">Name 1</span>
    </div>

    <div className="actions">
      <button className="show-more">...</button>
      <button className="close">Close</button>
    </div>
  </header>
);

export default Header;
