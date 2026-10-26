import React from "react";
import { Clock, User, Tag } from "lucide-react";

const CATEGORY_COLORS = {
  Travel: "bg-blue-100 text-blue-700",
  Productivity: "bg-green-100 text-green-700",
  Lifestyle: "bg-purple-100 text-purple-700",
  Books: "bg-amber-100 text-amber-700",
  Technology: "bg-cyan-100 text-cyan-700",
  Other: "bg-gray-100 text-gray-600",
};

export default function BlogCard({ post, navigate, featured = false }) {
  const categoryStyle = CATEGORY_COLORS[post.category] || CATEGORY_COLORS.Other;

  if (featured) {
    return (
      <article
        onClick={() => navigate("post", post.id)}
        className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-ink-100 hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row"
      >
        <div className="sm:w-1/2 h-56 sm:h-auto overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80";
            }}
          />
        </div>
        <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-4 ${categoryStyle}`}>
            <Tag size={11} />
            {post.category}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 font-serif leading-snug mb-3 group-hover:text-ink-600 transition-colors">
            {post.title}
          </h2>
          <p className="text-ink-500 text-sm leading-relaxed line-clamp-3 mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs text-ink-400">
            <span className="flex items-center gap-1">
              <User size={12} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => navigate("post", post.id)}
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-ink-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80";
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-3 ${categoryStyle}`}>
          <Tag size={11} />
          {post.category}
        </span>
        <h2 className="text-lg font-bold text-ink-900 font-serif leading-snug mb-2 group-hover:text-ink-600 transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-ink-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-ink-400 pt-3 border-t border-ink-100">
          <span className="flex items-center gap-1">
            <User size={11} />
            {post.author}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Clock size={11} />
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
