import type { Handle, GetSession } from '@sveltejs/kit';
import { Configuration, PublicApi } from '@ory/kratos-client';
import config from '$lib/config';

const kratos = new PublicApi(new Configuration({ basePath: config.kratos.public }));

export const handle: Handle = async ({ request, render }) => {
	const res = await fetch(`${config.kratos.public}/sessions/whoami`, {
		headers: {
			Cookie: `${request.headers.cookie}`,
			credentials: 'include'
		}
	});

	const session = await res.json();
	// console.log('session', session);
	if (session !== undefined) request.locals.user = session;

	const response = await render(request);

	return {
		...response,
		headers: {
			...response.headers,
			credentials: 'include'
		}
	};
};

export const getSession: GetSession = (request) => {
	return {
		user: request.locals.user.identity && {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			email: request.locals.user?.identity?.traits.email,
			first_name: request.locals.user?.identity?.traits.name.first,
			last_name: request.locals.user?.identity?.traits.name.last
		},
		traits: request.locals.user?.identity?.traits
	};
};
