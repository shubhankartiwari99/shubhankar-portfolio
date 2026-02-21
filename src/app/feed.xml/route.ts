import { getAllPosts } from "@/data/posts";

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = "https://shubhankartiwari.vercel.app";
  
  const rssItems = posts.map((post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.tags.join(", ")}</category>
    </item>
  `).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shubhankar Tiwari - Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Thoughts on backend systems, production engineering, and applied AI from a Software Engineer at Bank of America.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>tiwarishubhankar@gmail.com (Shubhankar Tiwari)</managingEditor>
    <webMaster>tiwarishubhankar@gmail.com (Shubhankar Tiwari)</webMaster>
    <image>
      <url>${siteUrl}/og_final.png</url>
      <title>Shubhankar Tiwari - Blog</title>
      <link>${siteUrl}/blog</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
