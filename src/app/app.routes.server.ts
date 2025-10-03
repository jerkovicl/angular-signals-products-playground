// app.routes.server.ts
// prerender info https://angular.dev/guide/ssr#parameterized-routes
import { RenderMode, ServerRoute } from '@angular/ssr';
export const serverRoutes: ServerRoute[] = [
  {
    path: '', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'login', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Client,
    // fallback: PrerenderFallback.Client, // Fallback to CSR if not prerendered
  },
  {
    path: 'products', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: 'product/:id/edit', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: 'product/add', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
