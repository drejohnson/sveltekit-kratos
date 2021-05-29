# SvelteKit-Kratos

> Basic SvelteKit example use [Ory Kratos](https://ory.sh/kratos) for authentication.

## Features

* [x] Svelte via [SvelteKit](https://kit.svelte.dev)
* [x] Authentication via [Kratos](https://ory.sh/kratos)
* [x] Styling via [tailwindcss](https://tailwindcss.com)
* [ ] GraphQL via [Hasura](https://hasura.io/)

## Quick start

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Start Kratos :

```bash
docker compose up --build --force-recreate
```

Build a production version of your app by running:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## TODO

* [ ] Fix CORS issue for settings page (only works in Firefox)
* [ ] Fix misc styles issues for different browsers
* [ ] Fix password toggle in Firefox (works in Chrome and Safari) 
* [ ] Add GraphQL via Hasura
