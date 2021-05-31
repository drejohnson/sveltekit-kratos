import type { Handle, GetSession } from '@sveltejs/kit';
import config from '$lib/config';

export const handle: Handle = async ({ request, resolve }) => {
	const res = await fetch(`${config.kratos.public}/sessions/whoami`, {
		headers: {
			Authorization: `${request.headers.authorization}`,
			Cookie: `${request.headers.cookie}`
		}
	});

	const session = await res.json();

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
