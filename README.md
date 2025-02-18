This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---
# Nippo app

* Allows to record daily reports.
* This project uses `SUPABASE` as data storage.

## Getting Started

create `./.env.local` file like the one below.

```bash
SUPABASE_URL=<supabase_url>
SUPABASE_ANON_KEY=<supabase_key>
NEXT_PUBLIC_API_URL=<app_api_url> (http://localhost:3000)
BASIC_ID=<Basic Authentication id>
BASIC_PWD=<Basic Authentication password>
```

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
