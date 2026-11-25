const OBSOLETE_SHOPIFY_EXACT = new Set([
  '/cart',
  '/collections',
  '/products',
  '/policies',
  '/pages',
  '/blogs',
  '/search',
  '/account',
  '/checkouts',
  '/variants',
]);

const OBSOLETE_SHOPIFY_PREFIXES = [
  '/collections/',
  '/products/',
  '/policies/',
  '/cart/',
  '/pages/',
  '/blogs/',
  '/search/',
  '/account/',
  '/checkouts/',
  '/variants/',
];

export function normalizePathname(pathname: string): string {
  const lower = pathname.toLowerCase();
  if (lower.length > 1 && lower.endsWith('/')) {
    return lower.slice(0, -1);
  }
  return lower || '/';
}

export function isObsoleteShopifyPath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  if (OBSOLETE_SHOPIFY_EXACT.has(normalized)) {
    return true;
  }
  return OBSOLETE_SHOPIFY_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function isValidAppDocumentPath(pathname: string): boolean {
  const normalized = normalizePathname(pathname);
  return normalized === '/' || normalized === '/index.html';
}
