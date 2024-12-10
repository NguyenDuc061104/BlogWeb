import React, { useState } from "react";
import "./../styles/PostSection.css";

function PostSection() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: "You",
        content: newPost,
        time: "Just finished",
        likes: 0,
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="post-section">
      {/* Nhập bài đăng mới */}
      <div className="post-box">
        <input
          type="text"
          placeholder="Bạn đang nghĩ gì?"
          className="post-input"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handleAddPost}>Đăng bài</button>
      </div>

      {/* Danh sách bài đăng */}
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <span className="post-author">{post.author}</span>
            <span className="post-time">{post.time}</span>
          </div>
          <div className="post-content">{post.content}</div>
          <div className="post-actions">
            <button onClick={() => handleLike(post.id)}>
              <i className="fas fa-thumbs-up"></i> Like ({post.likes})
            </button>
            <button><i className="fas fa-comment"></i> Comment</button>
            <button><i className="fas fa-share"></i> Share</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostSection;
