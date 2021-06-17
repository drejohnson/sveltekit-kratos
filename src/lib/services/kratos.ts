import { Configuration, PublicApi, AdminApi } from '@ory/kratos-client';
import config from '$lib/config';

const configuration = new Configuration({
	basePath: config.kratos.admin
});

export const kratosPublicApi = new PublicApi(configuration);
export const kratosAdminApi = new AdminApi(configuration);
