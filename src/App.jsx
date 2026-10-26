import React, { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import CreatePost from "./components/CreatePost.jsx";
import BlogPost from "./components/BlogPost.jsx";
import { seedPosts } from "./data/seedPosts.js";

// Simple view-state router — no dependency needed at this scale
export default function App() {
  const [posts, setPosts] = useState(seedPosts);
  const [view, setView] = useState("home"); // "home" | "create" | "post"
  const [activePostId, setActivePostId] = useState(null);

  const navigate = (target, postId = null) => {
    setView(target);
    setActivePostId(postId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCreatePost = (newPost) => {
    const post = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      readTime: `${Math.max(1, Math.ceil(newPost.content.split(" ").length / 200))} min read`,
      coverImage: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 99999999)}?w=800&q=80`,
    };
    // Prepend so newest posts appear first
    setPosts((prev) => [post, ...prev]);
    navigate("home");
  };

  const activePost = posts.find((p) => p.id === activePostId);

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar view={view} navigate={navigate} />

      <main>
        {view === "home" && (
          <Home posts={posts} navigate={navigate} />
        )}
        {view === "create" && (
          <CreatePost onSubmit={handleCreatePost} onCancel={() => navigate("home")} />
        )}
        {view === "post" && activePost && (
          <BlogPost post={activePost} navigate={navigate} allPosts={posts} />
        )}
      </main>

      <footer className="border-t border-ink-200 mt-20 py-10 text-center text-sm text-ink-500">
        <p className="font-serif">
          <span className="font-semibold text-ink-700">Inkwell</span> — A place for ideas worth writing down.
        </p>
        <p className="mt-1 text-xs text-ink-400">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </div>
  );
}
