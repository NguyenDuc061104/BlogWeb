import React from 'react';
import '../styles/userpage.css';
import { useParams } from 'react-router-dom';

function UserPage() {
  const { username } = useParams(); // Lấy tên người dùng từ URL

  return (
    <div className="user-page">
      <h2>User Page: {username}</h2>
      {/* Bạn có thể hiển thị các thông tin chi tiết của người dùng tại đây */}
    </div>
  );
}

export default UserPage;
