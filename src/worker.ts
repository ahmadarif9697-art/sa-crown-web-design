import { isObsoleteShopifyPath } from './utils/routePaths';

interface AssetsBinding {
  fetch(input: Request | string | URL, init?: RequestInit): Promise<Response>;
}

export interface Env {
  ASSETS: AssetsBinding;
}

const FALLBACK_404_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 Page Not Found — SA Crown Web Design</title>
    <meta name="robots" content="noindex, nofollow" />
  </head>
  <body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#102B25;color:#F5EBD7;font-family:system-ui,sans-serif;padding:24px;">
    <main style="max-width:520px;padding:32px;background:#0B1F1B;border:1px solid rgba(214,182,111,0.3);">
      <p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#D6B66F;">404 · Page Not Found</p>
      <h1 style="margin:12px 0 0;font-size:28px;">This page is no longer available.</h1>
      <p style="margin:14px 0 0;line-height:1.6;color:rgba(245,235,215,0.82);">The requested URL does not exist on SA Crown Web Design.</p>
      <p style="margin:24px 0 0;"><a href="/" style="display:inline-block;padding:12px 20px;background:#D6B66F;color:#102B25;text-decoration:none;font-weight:600;font-size:13px;">Return to Homepage</a></p>
    </main>
  </body>
</html>`;

async function createNotFoundResponse(request: Request, env: Env): Promise<Response> {
  let body: BodyInit | null = FALLBACK_404_HTML;

  try {
    const notFoundUrl = new URL('/404.html', request.url);
    const asset404 = await env.ASSETS.fetch(
      new Request(notFoundUrl.toString(), { method: request.method === 'HEAD' ? 'HEAD' : 'GET' })
    );
    if (asset404.ok) {
      body = request.method === 'HEAD' ? null : await asset404.text();
    } else if (request.method === 'HEAD') {
      body = null;
    }
  } catch {
    if (request.method === 'HEAD') {
      body = null;
    }
  }

  return new Response(body, {
    status: 404,
    statusText: 'Not Found',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Return an immediate HTTP 404 for obsolete Shopify routes rather than serving the SPA homepage.
    if (isObsoleteShopifyPath(url.pathname)) {
      return createNotFoundResponse(request, env);
    }

    const assetResponse = await env.ASSETS.fetch(request);

    // Ensure unknown paths never silently return HTTP 200 with index.html.
    if (assetResponse.status === 404) {
      return createNotFoundResponse(request, env);
    }

    return assetResponse;
  },
};
