import { originFromRequest } from "@/lib/site";

export function GET(request: Request) {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${originFromRequest(request)}/sitemap.xml\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
