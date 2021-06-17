import type { ServerRequest, ServerResponse } from '@sveltejs/kit/types/hooks';
import type { MaybePromise } from '@sveltejs/kit/types/helper';
import { Configuration, PublicApi, Session } from '@ory/kratos-client';
import config from '$lib/config';

interface Locals {
	session: Session;
}

const configuration = new Configuration({
	basePath: config.kratos.public
});

export const handle = async ({
	request,
	resolve
}: {
	request: ServerRequest<Locals>;
	resolve: (request: ServerRequest<Locals>) => MaybePromise<ServerResponse>;
}) => {
	const kratos = new PublicApi(configuration);

	try {
		const { status, data } = await kratos.toSession(request.headers['X-Session-Token'], {
			headers: {
				Authorization: `${request.headers.authorization}`,
				Cookie: `${request.headers.cookie}`
			},
			credentials: 'include'
		});

		if (status !== 401) request.locals.session = data;

		const response = await resolve(request);

		return {
			...response,
			headers: {
				...response.headers
			}
		};
	} catch (error) {
		if (error.response.status === 401) return await resolve(request);
	}
};

export const getSession = (request: ServerRequest<Locals>) => {
	return {
		user: request.locals.session && {
			// only include properties needed client-side —
			// exclude anything else attached to the user
			// like access tokens etc
			id: request.locals.session.identity.id,
			username: request.locals.session.identity.traits.username,
			email: request.locals.session?.identity?.traits.email,
			first_name: request.locals.session?.identity?.traits.name.first,
			last_name: request.locals.session?.identity?.traits.name.last
		}
	};
};
