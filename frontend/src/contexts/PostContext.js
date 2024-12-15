import React, { createContext, useState, useContext, useEffect } from 'react';
import defaultAvatar from '../assets/avatars/avatar.jpg';

export const PostContext = createContext(null);

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

const INITIAL_POSTS = [
    {
        id: 1,
        author: "Đức",
        title: "Hôm nay trời đẹp quá!",
        content: "Đây là nội dung bài viết...",
        preview: "Đây là nội dung...",
        time: "Vừa xong",
        readTime: "1 phút đọc",
        topic: "General",
        likes: 0,
        comments: 0,
        commentsList: [],
        avatar: null,
        image: null
    }
];

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('posts');
        return savedPosts ? JSON.parse(savedPosts) : INITIAL_POSTS;
    });

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const addPost = async (newPost) => {
        let imageUrl = null;
        if (newPost.image) {
            const reader = new FileReader();
            imageUrl = await new Promise((resolve) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(newPost.image);
            });
        }

        const post = {
            id: Date.now(),
            ...newPost,
            image: imageUrl,
            // Các thông tin bổ sung về người đăng
            author: newPost.author,
            authorId: newPost.authorId,
            avatar: newPost.avatar
        };

        setPosts([post, ...posts]);
    };

    return (
        <PostContext.Provider value={{ posts, setPosts, addPost }}>
            {children}
        </PostContext.Provider>
    );
}