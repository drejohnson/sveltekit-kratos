import type { Request } from '@sveltejs/kit';
import { Configuration, AdminApi } from '@ory/kratos-client';
import config from '$lib/config';

const configuration = new Configuration({
	basePath: config.kratos.admin
});

export const get = async (req: Request) => {
	const kratos = new AdminApi(configuration);
	const flowId = req.headers.flow_id;
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
			: 'getSelfServiceLoginFlow';

	try {
		const { status, data: flow } = await kratos[authFlow](flowId);

		return {
			body: { status, flow },
			status,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	} catch (error) {
		console.log('api error', error);
	}
};
