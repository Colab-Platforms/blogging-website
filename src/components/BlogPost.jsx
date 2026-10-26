import React from "react";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import BlogCard from "./BlogCard.jsx";

const CATEGORY_COLORS = {
  Travel: "bg-blue-100 text-blue-700",
  Productivity: "bg-green-100 text-green-700",
  Lifestyle: "bg-purple-100 text-purple-700",
  Books: "bg-amber-100 text-amber-700",
  Technology: "bg-cyan-100 text-cyan-700",
  Other: "bg-gray-100 text-gray-600",
};

export default function BlogPost({ post, navigate, allPosts }) {
  const categoryStyle = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.Other;

  // Related posts: same category, excluding current
  const related = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  // Render paragraphs preserving line breaks
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Back button */}
      <button
        onClick={() => navigate("home")}
        className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-800 transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to all posts
      </button>

      {/* Category badge */}
      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full mb-5 ${categoryStyle}`}>
        <Tag size={11} />
        {post.category}
      </span>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-ink-900 font-serif leading-tight mb-5">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-ink-500 mb-8 pb-8 border-b border-ink-200">
        <span className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-full bg-ink-200 flex items-center justify-center text-xs font-bold text-ink-700">
            {post.author.charAt(0)}
          </div>
          <span className="font-medium text-ink-700">{post.author}</span>
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {post.readTime}
        </span>
      </div>

      {/* Cover image */}
      <div className="rounded-2xl overflow-hidden mb-10 h-64 sm:h-80">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80";
          }}
        />
      </div>

      {/* Content */}
      <div className="prose-content text-ink-800 text-[1.05rem] leading-relaxed">
        {paragraphs.map((para, i) => (
          <p key={i} className="mb-6 leading-[1.85]">
            {para}
          </p>
        ))}
      </div>

      {/* Author card */}
      <div className="mt-14 p-6 bg-ink-100 rounded-2xl flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-ink-300 flex items-center justify-center text-lg font-bold text-ink-700 flex-shrink-0">
          {post.author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-ink-800 font-serif">{post.author}</p>
          <p className="text-sm text-ink-500 mt-1">
            Writer at Inkwell. Sharing ideas on {post.category.toLowerCase()} and beyond.
          </p>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-6">
            More in {post.category}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} navigate={navigate} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
