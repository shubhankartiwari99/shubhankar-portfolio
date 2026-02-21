export async function GET() {
  const siteUrl = "https://shubhankartiwari.vercel.app";
  
  const robots = `# Robots.txt for Shubhankar Tiwari Portfolio
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml

# RSS Feed
# ${siteUrl}/feed.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
