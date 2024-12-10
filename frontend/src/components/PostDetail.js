import React from 'react';
import '../styles/postdetail.css';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams(); // Lấy ID bài viết từ URL

  return (
    <div className="post-detail">
      <h2>Post ID: {id}</h2>
      {/* Bạn có thể hiển thị nội dung bài viết tại đây */}
    </div>
  );
}

export default PostDetail;
