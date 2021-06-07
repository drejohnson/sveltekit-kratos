# SvelteKit-Kratos

> Basic SvelteKit example using [Ory Kratos](https://ory.sh/kratos) for authentication.

## Features

- [x] Svelte via [SvelteKit](https://kit.svelte.dev)
- [x] Authentication via [Kratos](https://ory.sh/kratos)
- [x] Styling via [tailwindcss](https://tailwindcss.com)
- [ ] GraphQL via [Hasura](https://hasura.io/)

## Quick start

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Start Kratos:

```bash
docker compose up --build --force-recreate
```

Create cookie/default secret

```bash
openssl rand -base64 24
```

Create cryptographic keys for Oathkeeper JWT:

```bash
docker run oryd/oathkeeper:v0.38.11-beta.1 credentials generate --alg RS256 > ./.oathkeeper/id_token.jwks.json
```

Create SSL certificates for local development

```bash
mkcert *.myapp.local
```

Build a production version of your app by running:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## TODO

- [ ] Add [Oathkeeper](https://ory.sh/oathkeeper) as a reverse proxy
- [ ] Fix misc styles issues for different browsers
- [ ] Fix password toggle not working in Firefox (works in Chrome and Safari)
- [ ] Add GraphQL via Hasura

## Disclaimer

> I suggest using the Chrome browser to run this example.

> SvelteKit is still in early beta and has various bugs, especially in Firefox

> If you're on Windows and using WSL2 you might face a bug where the dev server constantly refreshes because of a websocket connection error when using host 127.0.0.1
