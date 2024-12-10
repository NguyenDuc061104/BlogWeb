import React from "react";

const PostButton = ({ handlePost }) => (
  <button className="post-button" onClick={handlePost}>
    Post
  </button>
);

export default PostButton;
