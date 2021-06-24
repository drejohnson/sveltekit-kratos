import type { ServerRequest, ServerResponse } from '@sveltejs/kit/types/hooks';
import type { MaybePromise } from '@sveltejs/kit/types/helper';
import type { Session } from '@ory/kratos-client';
import { kratosPublicApi } from '$lib/services/kratos';
import config from '$lib/config';

interface Locals {
	session: Session;
}

export const handle = async ({
	request,
	resolve
}: {
	request: ServerRequest<Locals>;
	resolve: (request: ServerRequest<Locals>) => MaybePromise<ServerResponse>;
}) => {
	try {
		const { status, data } = await kratosPublicApi.toSession(undefined, {
			headers: {
				Authorization: `${request.headers.authorization}`,
				Cookie: `${request.headers.cookie}`,
				Origin: config.baseUrl
			},
			credentials: 'include'
		});

		if (status === 401) {
			request.locals.session = undefined;
			return await resolve(request);
		}

		request.locals.session = data;

		const response = await resolve(request);

		return {
			...response,
			headers: {
				...response.headers
			}
		};
	} catch (error) {
		// console.log('hooks error', error.response.data.error);
		if (error.response.data.error.code === 401) {
			return await resolve(request);
		}
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
