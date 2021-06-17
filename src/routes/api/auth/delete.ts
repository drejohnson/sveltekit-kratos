import type { Request } from '@sveltejs/kit';
import { Configuration, AdminApi } from '@ory/kratos-client';
import config from '$lib/config';

const configuration = new Configuration({
	basePath: config.kratos.admin
});

const kratos = new AdminApi(configuration);

export const del = async (request: Request) => {
	const { id } = JSON.parse(request.body as string);

	const { data } = await kratos.getIdentity(id);

	if (id === data.id) {
		await kratos.deleteIdentity(id);
		return {
			status: 200,
			body: { success: true, id }
		};
	}

	return {
		status: 404,
		body: {
			error: 'User not found'
		}
	};
};
