import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    //console.log(req.nextUrl.origin);
  //const posts = await getAllPostsSlugs();
  //console.log(posts);
  //const body = generateSiteMap(req.nextUrl.origin, posts);
 
  return new Response(
  `# *
User-agent: *
Allow: /

# Host
Host: ${req.nextUrl.origin}

# Sitemaps
Sitemap: ${req.nextUrl.origin}/sitemap.xml

    `,
     {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "text/plain",
    },
  });
}