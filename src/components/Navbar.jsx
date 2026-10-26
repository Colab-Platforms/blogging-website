import React, { useState, useEffect } from "react";
import { PenLine, BookOpen, Menu, X } from "lucide-react";

export default function Navbar({ view, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-ink-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-ink-800 rounded-full flex items-center justify-center group-hover:bg-ink-600 transition-colors">
            <BookOpen size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold text-ink-800 tracking-tight font-serif">
            Inkwell
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6">
          <button
            onClick={() => navigate("home")}
            className={`text-sm font-medium transition-colors hover:text-ink-800 ${
              view === "home" ? "text-ink-800 border-b-2 border-ink-800 pb-0.5" : "text-ink-500"
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => navigate("create")}
            className="flex items-center gap-2 bg-ink-800 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-ink-600 transition-colors"
          >
            <PenLine size={15} />
            Write a Post
          </button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden text-ink-700 p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-ink-100 px-4 py-4 flex flex-col gap-3">
          <button
            onClick={() => { navigate("home"); setMenuOpen(false); }}
            className="text-sm font-medium text-ink-700 text-left py-2"
          >
            All Posts
          </button>
          <button
            onClick={() => { navigate("create"); setMenuOpen(false); }}
            className="flex items-center gap-2 bg-ink-800 text-white text-sm font-medium px-4 py-2 rounded-full w-fit"
          >
            <PenLine size={15} />
            Write a Post
          </button>
        </div>
      )}
    </header>
  );
}
