import { Configuration, PublicApi, AdminApi } from '@ory/kratos-client';
import config from '$lib/config';

export const kratosPublicApi = new PublicApi(
	new Configuration({
		basePath: config.kratos.public
	})
);

export const kratosAdminApi = new AdminApi(
	new Configuration({
		basePath: config.kratos.admin
	})
);
