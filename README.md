# Whispering Pages

A site for publishing and reading poetry. Poems are grouped by theme, readers
can browse or search them, and an admin page handles adding and editing entries.

## Structure

Six routes under `src/pages`: `Home` (featured poems), `Poetry` (the full
collection), `About`, `Contact` (a form that writes submissions to the
database), `Admin` (poem management), and a `NotFound` fallback.

Supabase holds both the poems and the contact submissions. The schema is in
`supabase-schema.sql`.

## Running it

Requires Node.js 18+.

```bash
git clone https://github.com/Flopchamp/whispering-pages-main.git
cd whispering-pages-main
npm install
npm run dev
```

Create a `.env` in the project root with your Supabase project details:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Then apply `supabase-schema.sql` to the project to create the tables.

## Other commands

```bash
npm run build     # production build
npm run preview   # serve the production build locally
npm run lint      # eslint
```

## Deployment

Any static host works. `vercel.json` holds the SPA rewrite rules so client-side
routes resolve on refresh.

## Stack

Vite · React · TypeScript · Tailwind CSS · shadcn/ui · Supabase
