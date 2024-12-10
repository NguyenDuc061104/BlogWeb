import React from "react";

const PostDetails = ({
  postTitle,
  setPostTitle,
  postDescription,
  setPostDescription,
}) => (
  <div className="post-details">
    <label htmlFor="post-title">Title</label>
    <input
      type="text"
      id="post-title"
      placeholder="Write here..."
      value={postTitle}
      onChange={(e) => setPostTitle(e.target.value)}
    />

    <label htmlFor="post-description">Description</label>
    <textarea
      id="post-description"
      placeholder="The start of a wonderful story..."
      value={postDescription}
      onChange={(e) => setPostDescription(e.target.value)}
    ></textarea>
  </div>
);

export default PostDetails;
