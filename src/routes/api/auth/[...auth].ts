import type { Request } from '@sveltejs/kit';
import { Configuration, AdminApi } from '@ory/kratos-client';
import config from '$lib/config';

const configuration = new Configuration({
	basePath: config.kratos.admin
});

export const get = async (req: Request) => {
	const kratos = new AdminApi(configuration);
	const flowId = req.headers.flow_id;
	const error = req.headers.error;
	const flowType = req.params.auth;

	let authFlow =
		flowType === 'registration'
			? 'getSelfServiceRegistrationFlow'
			: flowType === 'recovery'
			? 'getSelfServiceRecoveryFlow'
			: flowType === 'verification'
			? 'getSelfServiceVerificationFlow'
			: flowType == 'settings'
			? 'getSelfServiceSettingsFlow'
			: flowType == 'error'
			? 'getSelfServiceError'
			: 'getSelfServiceLoginFlow';

	try {
		const { status, data } = await kratos[authFlow](flowType === 'error' ? error : flowId);

		return {
			body: { status, data },
			status,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	} catch (error) {
		console.log('api error', error);
	}
};
