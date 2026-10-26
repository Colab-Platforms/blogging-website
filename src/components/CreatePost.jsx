import React, { useState } from "react";
import { ArrowLeft, PenLine, Eye, AlertCircle } from "lucide-react";

const CATEGORIES = ["Travel", "Productivity", "Lifestyle", "Books", "Technology", "Other"];

const EMPTY_FORM = {
  title: "",
  author: "",
  category: "Other",
  excerpt: "",
  content: "",
};

export default function CreatePost({ onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(false);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    else if (form.title.trim().length < 10) errs.title = "Title must be at least 10 characters.";
    if (!form.author.trim()) errs.author = "Author name is required.";
    if (!form.excerpt.trim()) errs.excerpt = "Excerpt is required.";
    else if (form.excerpt.trim().length < 30) errs.excerpt = "Excerpt must be at least 30 characters.";
    if (!form.content.trim()) errs.content = "Content is required.";
    else if (form.content.trim().split(" ").length < 50) errs.content = "Content must be at least 50 words.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  };

  const wordCount = form.content.trim()
    ? form.content.trim().split(/\s+/).length
    : 0;

  const Field = ({ label, name, required, children, hint }) => (
    <div>
      <label className="block text-sm font-semibold text-ink-700 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
        {hint && <span className="font-normal text-ink-400 ml-1">({hint})</span>}
      </label>
      {children}
      {errors[name] && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1.5">
          <AlertCircle size={12} />
          {errors[name]}
        </p>
      )}
    </div>
  );

  const inputClass = (name) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-ink-800 bg-white placeholder-ink-300 focus:outline-none focus:ring-2 transition ${
      errors[name]
        ? "border-red-300 focus:ring-red-200"
        : "border-ink-200 focus:ring-ink-300"
    }`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-800 transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to all posts
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ink-900 font-serif">Write a Post</h1>
          <p className="text-ink-500 text-sm mt-1">Share your ideas with the Inkwell community.</p>
        </div>
        <button
          type="button"
          onClick={() => setPreview((p) => !p)}
          className="flex items-center gap-2 text-sm font-medium text-ink-600 border border-ink-200 px-4 py-2 rounded-full hover:bg-ink-100 transition"
        >
          <Eye size={15} />
          {preview ? "Edit" : "Preview"}
        </button>
      </div>

      {preview ? (
        /* Live preview */
        <div className="bg-white rounded-2xl border border-ink-200 p-6 sm:p-8">
          {form.category && (
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-ink-100 text-ink-600 mb-4">
              {form.category}
            </span>
          )}
          <h2 className="text-2xl font-bold text-ink-900 font-serif leading-snug mb-3">
            {form.title || <span className="text-ink-300">Your title will appear here…</span>}
          </h2>
          <p className="text-ink-500 text-sm mb-6 italic">
            {form.excerpt || <span className="text-ink-300">Your excerpt will appear here…</span>}
          </p>
          <div className="text-ink-700 text-sm leading-relaxed whitespace-pre-wrap">
            {form.content || <span className="text-ink-300">Your content will appear here…</span>}
          </div>
          {form.author && (
            <p className="mt-8 text-xs text-ink-400 border-t border-ink-100 pt-4">
              By <strong className="text-ink-600">{form.author}</strong>
            </p>
          )}
        </div>
      ) : (
        /* Form */
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Field label="Post Title" name="title" required hint="min 10 chars">
            <input
              type="text"
              value={form.title}
              onChange={set("title")}
              placeholder="e.g. Why I Stopped Checking Email in the Morning"
              className={inputClass("title")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Your Name" name="author" required>
              <input
                type="text"
                value={form.author}
                onChange={set("author")}
                placeholder="e.g. Ujjwal John"
                className={inputClass("author")}
              />
            </Field>

            <Field label="Category" name="category" required>
              <select
                value={form.category}
                onChange={set("category")}
                className={inputClass("category")}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Excerpt" name="excerpt" required hint="short summary, min 30 chars">
            <textarea
              value={form.excerpt}
              onChange={set("excerpt")}
              rows={3}
              placeholder="A one or two sentence summary that draws readers in…"
              className={inputClass("excerpt")}
            />
          </Field>

          <Field label="Content" name="content" required hint="min 50 words">
            <textarea
              value={form.content}
              onChange={set("content")}
              rows={14}
              placeholder="Write your post here. Separate paragraphs with a blank line for best formatting…"
              className={`${inputClass("content")} resize-y`}
            />
            <p className={`text-xs mt-1.5 text-right ${wordCount < 50 ? "text-ink-400" : "text-green-600"}`}>
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </p>
          </Field>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 bg-ink-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-ink-600 transition-colors text-sm"
            >
              <PenLine size={16} />
              Publish Post
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-full border border-ink-200 text-ink-600 text-sm font-medium hover:bg-ink-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
