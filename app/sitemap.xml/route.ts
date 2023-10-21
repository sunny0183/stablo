import { getAllPostsSlugs } from "@/lib/sanity/client";
import { NextRequest } from "next/server";

//const URL = process.env.SITE_URL||"http://localhost:3000";
 
function generateSiteMap(URL:string, posts:any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${URL}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
     </url>
     <url>
       <loc>${URL}/post</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
     </url>
      <url>
       <loc>${URL}/archive</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1</priority>
     </url>
     ${posts
       .map(({ slug }) => {
         return `
           <url>
               <loc>${`${URL}/post/${slug}`}</loc>
               <lastmod>${new Date().toISOString()}</lastmod>
               <changefreq>daily</changefreq>
               <priority>1</priority>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}
 
export async function GET(req:NextRequest) {
    //console.log(req.nextUrl.origin);
  const posts = await getAllPostsSlugs();
  //console.log(posts);
  const body = generateSiteMap(req.nextUrl.origin, posts);
 
  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}