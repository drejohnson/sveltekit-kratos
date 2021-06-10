import type { Handle, GetSession } from '@sveltejs/kit';
import { jwtVerify } from 'jose/jwt/verify';
import { createRemoteJWKSet } from 'jose/jwks/remote';
import config from '$lib/config';

export const handle: Handle = async ({ request, resolve }) => {
	async function handleCookie(req) {
		const res = await fetch(`${config.kratos.public}/sessions/whoami`, {
			headers: {
				Cookie: `${req.headers.cookie}`
			}
		});

		const session = await res.json();

		return session;
	}

	async function handleJwt(req) {
		const JWKS = createRemoteJWKSet(new URL(config.jwksUrl));
		const authHeader = req.headers;

		console.log('JWKSauthHeader', authHeader);
		console.log('JWKS', JWKS);

		// if (!authHeader?.startsWith('Bearer ')) {
		// 	throw Error('Auth header that does not start with Bearer');
		// }

		// const jwt = authHeader?.split(' ')[1];

		// const { payload, protectedHeader } = await jwtVerify(jwt, JWKS);

		// console.log('payload', payload);
		// console.log('protectedHeader', protectedHeader);

		return { user: { name: 'Dre Johnson' } };
	}

	const session =
		config.securityMode === 'cookie' ? await handleCookie(request) : await handleJwt(request);

	if (session !== undefined) request.locals.user = session;

	const response = await resolve(request);

	if (session.status === 401) return response;

	return {
		...response,
		headers: {
			...response.headers
		}
	};
};

export const getSession: GetSession = (request) => {
	return {
		user: request.locals.user.identity && {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			username: request.locals.user?.identity?.traits.username,
			email: request.locals.user?.identity?.traits.email,
			first_name: request.locals.user?.identity?.traits.name.first,
			last_name: request.locals.user?.identity?.traits.name.last
		}
	};
};
