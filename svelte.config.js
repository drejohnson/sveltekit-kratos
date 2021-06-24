import { readFileSync } from 'fs';
import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		defaults: {
			style: 'postcss'
		},
		postcss: true
	}),

	kit: {
		adapter: node(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		hostHeader: 'X-Forwarded-Host',
		// trailingSlash: 'ignore',
		vite: () => ({
			server: {
				host: '0.0.0.0',
				port: 3000,
				https: {
					key: readFileSync('./certs/local/svltkt.local+1-key.pem'),
					cert: readFileSync('./certs/local/svltkt.local+1.pem')
				},
				hmr: {
					host: 'localhost',
					protocol: 'wss',
					port: 24678
				}
			}
		})
	}
};

export default config;
