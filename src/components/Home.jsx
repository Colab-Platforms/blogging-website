import React, { useState } from "react";
import BlogCard from "./BlogCard.jsx";
import { Search, TrendingUp } from "lucide-react";

const CATEGORIES = ["All", "Travel", "Productivity", "Lifestyle", "Books", "Technology", "Other"];

export default function Home({ posts, navigate }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-ink-900 font-serif leading-tight mb-4">
          Stories worth reading.
        </h1>
        <p className="text-ink-500 text-lg max-w-xl mx-auto">
          A community of writers sharing ideas on travel, productivity, culture, and everything in between.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg mx-auto mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
        <input
          type="text"
          placeholder="Search posts, authors…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full border border-ink-200 bg-white text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-ink-300 transition"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-ink-800 text-white"
                : "bg-white border border-ink-200 text-ink-600 hover:border-ink-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-ink-400">
          <p className="text-xl font-serif mb-2">No posts found.</p>
          <p className="text-sm">Try a different search or category.</p>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-ink-500" />
                <span className="text-xs font-semibold uppercase tracking-widest text-ink-500">
                  Featured
                </span>
              </div>
              <BlogCard post={featured} navigate={navigate} featured />
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6">
                More Posts
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <BlogCard key={post.id} post={post} navigate={navigate} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
