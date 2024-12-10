import React from 'react';
import '../styles/content.css'; 
import { Link } from 'react-router-dom';

function Content() {
  const posts = [
    { id: 1, title: "Hôm nay tôi dui", preview: "Hôm nay là một ngày dui ..." },
    { id: 2, title: "Hôm nay tôi buồn", preview: "Hôm nay là một ngày buồn ..." },
    { id: 3, title: "Hôm nay lớp đi học đông vậy", preview: "Hôm nay tự dưng lớp tôi đi rất đầy đủ" },
  ];

  return (
    <div className="content">
      {posts.map(post => (
        <div key={post.id} className="ranking-box">
          <h3>Ranking: Daily</h3>
          <ul>
            <li>
              <Link to={`/post/${post.id}`} className="title">
                {post.title}
              </Link>
              <div className="preview">{post.preview}</div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Content;
