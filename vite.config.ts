import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import type {IncomingMessage, ServerResponse} from 'http';
import path from 'path';
import {defineConfig} from 'vite';
import {isObsoleteShopifyPath} from './src/utils/routePaths.ts';

function handleObsoleteShopify404(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
): void {
  const rawUrl = req.url || '/';
  const pathname = rawUrl.split('?')[0];
  if (
    (req.method === 'GET' || req.method === 'HEAD') &&
    isObsoleteShopifyPath(pathname)
  ) {
    const html404Path = path.resolve(__dirname, 'public/404.html');
    const html = fs.existsSync(html404Path)
      ? fs.readFileSync(html404Path, 'utf-8')
      : '<h1>404 Not Found</h1>';
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.end(req.method === 'HEAD' ? undefined : html);
    return;
  }
  next();
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'obsolete-shopify-404-middleware',
        configureServer(server) {
          server.middlewares.use(handleObsoleteShopify404);
        },
        configurePreviewServer(server) {
          server.middlewares.use(handleObsoleteShopify404);
        },
      },
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
