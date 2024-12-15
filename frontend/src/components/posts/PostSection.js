import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../../contexts/PostContext';
import UserAvatar from '../../assets/avatars/avatar.jpg';

const PostSection = () => {
  const { topicName } = useParams();
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [newTag, setNewTag] = useState('');
  const { posts, setPosts } = usePosts();

  const addTagToPost = (postId, e) => {
    e.stopPropagation();
    if (!newTag.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const currentTags = post.tags || [];
        if (!currentTags.includes(newTag.trim())) {
          return {
            ...post,
            tags: [...currentTags, newTag.trim()]
          };
        }
      }
      return post;
    }));
    setNewTag('');
    setEditingPostId(null);
  };

  const removeTagFromPost = (postId, tagToRemove, e) => {
    e.stopPropagation();
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          tags: (post.tags || []).filter(tag => tag !== tagToRemove)
        };
      }
      return post;
    }));
  };

  const filteredPosts = topicName 
    ? posts.filter(post => {
        return post.topic.toLowerCase() === topicName.toLowerCase() ||
               (post.tags && post.tags.some(tag => tag.toLowerCase() === topicName.toLowerCase()));
      })
    : posts;

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    navigate(`/topic/${tag.toLowerCase()}`);
  };

  return (
    <div className="blog-section">
      <div className="create-post" onClick={() => setShowCreatePost(true)}>
        <img src={UserAvatar} alt="User" className="user-avatar" />
        <div className="post-input-trigger">Share your story!!!</div>
      </div>

      <div className="posts-list">
        {filteredPosts.map(post => (
          <article 
            key={post.id} 
            className="post-card"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="post-header">
              <div className="author-info">
                <img src={post.avatar || UserAvatar} alt={post.author} className="author-avatar" />
                <div className="author-details">
                  <span className="author-name">{post.author}</span>
                  <span className="post-meta">
                    {post.time} · {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-preview">{post.preview}</p>
            </div>

            <div className="post-footer">
              <div className="post-meta-content">
                <div className="post-topics">
                  <span 
                    className="topic-badge"
                    onClick={(e) => handleTagClick(e, post.topic)}
                  >
                    {post.topic}
                  </span>
                  {post.tags && post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="tag-badge"
                      onClick={(e) => handleTagClick(e, tag)}
                    >
                      {tag}
                      <button 
                        className="remove-tag-btn"
                        onClick={(e) => removeTagFromPost(post.id, tag, e)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {editingPostId === post.id ? (
                    <div 
                      className="tag-input-container"
                      onClick={e => e.stopPropagation()}
                    >
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        className="tag-input"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addTagToPost(post.id, e);
                          }
                        }}
                      />
                      <button 
                        className="add-tag-button"
                        onClick={(e) => addTagToPost(post.id, e)}
                      >
                        Add
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="add-tag-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPostId(post.id);
                      }}
                    >
                      +
                    </button>
                  )}
                </div>
                <div className="post-stats">
                  <span>👍 {post.likes || 0}</span>
                  <span>💬 {post.comments || 0}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default PostSection;