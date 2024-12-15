// components/common/PostInteractions.js
import React, { useState } from 'react';
import HeartIcon from '../../assets/heart.png';
import CommentIcon from '../../assets/comment.png';
import ShareIcon from '../../assets/share.png';
import '../../styles/components/common/PostInteractions.css';

const PostInteractions = ({ post }) => {
    const [likes, setLikes] = useState(post.likes || 0);
    const [showComments, setShowComments] = useState(false);
    const [showSharePanel, setShowSharePanel] = useState(false);
    const [comment, setComment] = useState('');

    const handleLike = () => {
        setLikes(prev => prev + 1);
        // Thêm logic cập nhật like vào database
    };

    return (
        <div className="post-interactions">
            <div className="post-actions">
                <button className="action-btn" onClick={handleLike}>
                    <img src={HeartIcon} alt="Like" />
                    <span>Like</span>
                    <span className="count">{likes}</span>
                </button>
                <button className="action-btn" onClick={() => setShowComments(!showComments)}>
                    <img src={CommentIcon} alt="Comment" />
                    <span>Comment</span>
                    <span className="count">{post.comments || 0}</span>
                </button>
                <button className="action-btn" onClick={() => setShowSharePanel(!showSharePanel)}>
                    <img src={ShareIcon} alt="Share" />
                    <span>Share</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="comments-section">
                    <div className="comments-list">
                        {post.commentsList?.map((comment, index) => (
                            <div key={index} className="comment">
                                <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
                                <div className="comment-content">
                                    <h4>{comment.author}</h4>
                                    <p>{comment.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="comment-input">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write a comment..."
                        />
                        <button onClick={() => {/* Thêm logic submit comment */}}>Send</button>
                    </div>
                </div>
            )}

            {/* Share Panel */}
            {showSharePanel && (
                <div className="share-panel">
                    <h3>Share this post</h3>
                    <div className="share-options">
                        <button className="share-btn facebook">
                            <i className="fab fa-facebook"></i>
                            Facebook
                        </button>
                        <button className="share-btn twitter">
                            <i className="fab fa-twitter"></i>
                            Twitter
                        </button>
                        <button className="share-btn linkedin">
                            <i className="fab fa-linkedin"></i>
                            LinkedIn
                        </button>
                        <button className="share-btn copy-link">
                            <i className="fas fa-link"></i>
                            Copy Link
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostInteractions;