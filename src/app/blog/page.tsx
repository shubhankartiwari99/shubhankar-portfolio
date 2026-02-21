"use client";

import Link from "next/link";
import { getAllPosts } from "@/data/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-24 pb-8">
        <Link
          href="/"
          data-testid="blog-home-link"
          className="font-mono text-sm transition-colors duration-300 inline-block mb-12"
          style={{ color: "var(--muted-fg)" }}
        >
          &larr; back to portfolio
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg" style={{ color: "var(--muted)" }}>
          Thoughts on backend systems, production engineering, and applied AI.
        </p>
      </header>

      {/* Posts */}
      <main className="max-w-3xl mx-auto px-6 pb-24">
        <div className="space-y-1">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              data-testid={`blog-post-${post.slug}`}
              className="block group rounded-2xl border p-6 transition-all duration-300"
              style={{ borderColor: "var(--border)" }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = "var(--accent)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="font-mono text-xs" style={{ color: "var(--muted-fg)" }}>
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </span>
                <span className="font-mono text-xs" style={{ color: "var(--muted-fg)" }}>&middot;</span>
                <span className="font-mono text-xs" style={{ color: "var(--muted-fg)" }}>{post.readTime}</span>
              </div>

              <h2 className="text-xl font-semibold transition-colors duration-300 group-hover:text-[var(--accent)]">
                {post.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2 py-0.5 rounded-md"
                    style={{ color: "var(--accent)", background: "var(--accent-dim)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
