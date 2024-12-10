import React from "react";

const ImageUpload = ({ selectedImage, handleImageUpload }) => (
  <div className="image-upload">
    <div className="upload-box">
      {selectedImage ? (
        <img src={selectedImage} alt="Uploaded Preview" />
      ) : (
        <>
          <img src="../img/vector.png" alt="Upload Icon" />
          <p>
            Drop your image here or{" "}
            <label htmlFor="image-upload-input">
              <a href="#">browse</a>
            </label>
          </p>
          <input
            type="file"
            id="image-upload-input"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </>
      )}
    </div>
  </div>
);

export default ImageUpload;
