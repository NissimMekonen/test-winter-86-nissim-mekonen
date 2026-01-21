"use client";

import { useState, useEffect } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleAddPost = async () => {
    const newPost = {
      author,
      title,
      content,
      likes: Number(likes),
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // <-- REQUIRED FIX
      },
      body: JSON.stringify(newPost),
    });

    const created = await res.json();

    setPosts((prev) => [...prev, created]);

    setAuthor("");
    setTitle("");
    setContent("");
    setLikes("");
  };

  const handleDelete = async (id) => {
    await fetch("/api/posts", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // <-- REQUIRED FIX
      },
      body: JSON.stringify({ id }),
    });

    setPosts((prev) => prev.filter((post) => post._id !== id));
  };

  const longestPost =
    posts.length > 0
      ? posts.reduce((max, post) =>
          post.content.length > max.content.length ? post : max
        )
      : null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Posts</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          placeholder="Likes"
          type="number"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />

        <button onClick={handleAddPost}>Add Post</button>
      </div>

      <div>
        {posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>Author: {post.author}</p>
            <p>Title: {post.title}</p>
            <p>Content: {post.content}</p>
            <p>Likes: {post.likes}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))}
      </div>

      {longestPost && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          The Most Long Post is with the title – {longestPost.title} of{" "}
          {longestPost.author}
        </p>
      )}
    </div>
  );
}
