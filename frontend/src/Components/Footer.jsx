import React from "react";
import "./../styles/Footer.css";

function Footer() {
  const links = [
    { label: "Introduction", url: "#" },
    { label: "Privacy Policy", url: "#" },
    { label: "Contact", url: "#" },
  ];

  return (
    <footer className="footer">
      {links.map((link) => (
        <a key={link.label} href={link.url}>
          {link.label}
        </a>
      ))}
    </footer>
  );
}

export default Footer;
