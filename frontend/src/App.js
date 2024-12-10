import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage'; // Trang hiển thị khi bấm vào icon user
import PostDetail from './components/PostDetail'; // Trang hiển thị khi bấm vào tiêu đề bài viết

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/:username" element={<UserPage />} /> {/* Trang cho mỗi người dùng */}
            <Route path="/post/:id" element={<PostDetail />} /> {/* Trang cho từng bài viết */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
