import React from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import "./reset.css";
import "./style.css";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
