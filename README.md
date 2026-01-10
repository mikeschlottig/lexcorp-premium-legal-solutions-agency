# Lex Corp Agency

[![[cloudflarebutton]]](https://deploy.workers.cloudflare.com/)

A modern, full-stack agency website template built on Cloudflare Workers and Pages. Features a responsive React frontend with Shadcn UI components, Tailwind CSS styling, and a Hono-powered API backend. Perfect for agencies, portfolios, or landing pages with seamless edge deployment.

## Features

- **Full-Stack Ready**: React 18 frontend with TanStack Query for data fetching, Hono API routes on Cloudflare Workers
- **Modern UI**: Shadcn UI (New York style) with 50+ pre-built components, dark/light theme support
- **Styling**: Tailwind CSS with custom gradients, animations, and glassmorphism effects
- **Performance**: Vite bundling, optimized for edge deployment, React Router for SPA navigation
- **Developer Experience**: TypeScript end-to-end, hot reload, Bun package management, ESLint + Prettier
- **Backend**: API routes in `worker/userRoutes.ts`, CORS enabled, error logging
- **Layout System**: Optional sidebar layout (`AppLayout`), mobile-responsive hooks
- **Utilities**: Error boundaries, theme toggle, client error reporting to Worker
- **Animations**: Framer Motion, Tailwind animations (shimmer, glow, float)

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons, React Router, TanStack Query
- **Backend**: Cloudflare Workers, Hono, TypeScript
- **UI/UX**: Radix UI primitives, Class Variance Authority (CVA), Tailwind Merge
- **State/Data**: Zustand, Immer, React Hook Form, Zod validation
- **Other**: Framer Motion, Sonner (toasts), Recharts, Date-fns, UUID
- **Dev Tools**: Bun, Wrangler, ESLint, TypeScript 5

## Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd lex-corp-agency-csggdwhujlgjywbbm8-qt
   bun install
   ```

2. **Development**:
   ```bash
   bun run dev
   ```
   Open `http://localhost:3000` (or `$PORT`).

3. **Build & Preview**:
   ```bash
   bun run build
   bun run preview
   ```

## Development

- **Frontend**: Edit `src/` files. Hot reloads automatically.
- **Backend API**: Add routes in `worker/userRoutes.ts` (e.g., `app.get('/api/test', ...)`). Do **not** modify `worker/index.ts`.
- **Custom Components**: Use Shadcn CLI via `components.json` aliases (`@/components/ui/button`).
- **Theme**: Toggle with `ThemeToggle`. Custom CSS in `src/index.css`.
- **API Calls**: Use `fetch('/api/...')` – proxied through Worker.
- **Linting**: `bun run lint`
- **Type Generation**: `bun run cf-typegen` (for Worker types)

### Project Structure

```
├── src/              # React app (pages, components, hooks)
├── worker/           # Cloudflare Worker API (edit userRoutes.ts only)
├── public/           # Static assets
└── ...               # Configs (Vite, Tailwind, Wrangler, TypeScript)
```

### Environment Variables

No env vars required. Add to `wrangler.jsonc` or Worker `Env` interface if needed.

## Deployment

Deploy to Cloudflare Pages + Workers with one command:

```bash
bun run deploy
```

This builds the frontend and deploys via Wrangler.

**[cloudflarebutton]**

### Manual Deployment

1. **Login**: `bunx wrangler login`
2. **Deploy**: `bun run deploy`
3. **Custom Domain**: Update in Cloudflare Dashboard > Pages > Custom Domains.
4. **Preview**: `wrangler pages dev dist` (local Pages preview).

Assets are served as SPA (`not_found_handling: "single-page-application"`). API routes (`/api/*`) route through Worker first.

## Customization

- **Home Page**: Replace `src/pages/HomePage.tsx`.
- **Layout**: Use `AppLayout` from `src/components/layout/AppLayout.tsx` in routes.
- **Sidebar**: Customize `src/components/app-sidebar.tsx`.
- **API**: Extend `worker/userRoutes.ts`.
- **Styling**: Edit `tailwind.config.js` and `src/index.css`.

## Contributing

1. Fork & clone
2. `bun install`
3. Make changes
4. `bun run lint`
5. PR to `main`

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ for Cloudflare. Questions? Open an issue!