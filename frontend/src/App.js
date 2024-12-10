import React from "react";

// Import Styles
import "./Styles/App.css"; // CSS tổng quát
import "./Styles/Sidebar.css"; // CSS cho Sidebar
import "./Styles/Header.css"; // CSS cho Header
import "./Styles/PostSection.css"; // CSS cho Post Section
import "./Styles/Footer.css"; // CSS cho Footer

// Import Components
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import PostSection from "./Components/PostSection";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Header />

        {/* Post Section */}
        <PostSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
