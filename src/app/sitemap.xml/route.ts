import { getAllPosts } from "@/data/posts";
import { getAllProjects } from "@/data/projects";

export async function GET() {
  const posts = getAllPosts();
  const projects = getAllProjects();
  const siteUrl = "https://shubhankartiwari.vercel.app";
  
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "monthly" },
    { url: "/blog", priority: "0.9", changefreq: "weekly" },
    { url: "/projects", priority: "0.9", changefreq: "monthly" },
  ];

  const staticEntries = staticPages.map(
    (page) => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join("");

  const postEntries = posts.map(
    (post) => `
  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join("");

  const projectEntries = projects.map(
    (project) => `
  <url>
    <loc>${siteUrl}/projects/${project.slug}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticEntries}
  ${postEntries}
  ${projectEntries}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
