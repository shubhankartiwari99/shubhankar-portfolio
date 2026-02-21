import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/data/posts";
import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Shubhankar Tiwari`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <article className="max-w-3xl mx-auto px-6 pt-24 pb-24">
        <Link
          href="/blog"
          data-testid="blog-back-link"
          className="font-mono text-sm transition-colors duration-300 inline-block mb-12"
          style={{ color: "var(--muted-fg)" }}
        >
          &larr; back to blog
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono text-xs" style={{ color: "var(--muted-fg)" }}>
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="font-mono text-xs" style={{ color: "var(--muted-fg)" }}>&middot;</span>
            <span className="font-mono text-xs" style={{ color: "var(--muted-fg)" }}>{post.readTime}</span>
          </div>

          <h1 data-testid="blog-post-title" className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2 mt-5">
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
        </header>

        <BlogContent content={post.content} />

        <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <Link
            href="/blog"
            className="font-mono text-sm transition-colors duration-300"
            style={{ color: "var(--accent)" }}
          >
            &larr; All posts
          </Link>
        </div>
      </article>
    </div>
  );
}
