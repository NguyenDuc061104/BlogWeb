import React, { useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import ImageUpload from "./components/ImageUpload";
import PostDetails from "./components/PostDetails";
import PostButton from "./components/PostButton";
import "./App.css";

function App() {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    if (postTitle && postDescription) {
      alert("Post submitted successfully!");
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div className="container">
      <Header />
      <main>
        <Banner />
        <div className="post-form">
          <ImageUpload
            selectedImage={selectedImage}
            handleImageUpload={handleImageUpload}
          />
          <PostDetails
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postDescription={postDescription}
            setPostDescription={setPostDescription}
          />
        </div>
        <PostButton handlePost={handlePost} />
      </main>
    </div>
  );
}

export default App;
