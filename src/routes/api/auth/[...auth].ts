import type { Request } from '@sveltejs/kit';
import { Configuration, AdminApi } from '@ory/kratos-client';
import config from '$lib/config';

const configuration = new Configuration({
	basePath: config.kratos.admin
});

export const get = async (req: Request) => {
	const kratos = new AdminApi(configuration);
	const flowId = req.headers.flow_id;
<<<<<<< HEAD
	const error = req.headers.error;
=======
>>>>>>> Initial commit
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
<<<<<<< HEAD
			: flowType == 'error'
			? 'getSelfServiceError'
			: 'getSelfServiceLoginFlow';

	try {
		const { status, data } = await kratos[authFlow](flowType === 'error' ? error : flowId);

		return {
			body: { status, data },
=======
			: 'getSelfServiceLoginFlow';

	try {
		const { status, data: flow } = await kratos[authFlow](flowId);

		return {
			body: { status, flow },
>>>>>>> Initial commit
			status,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	} catch (error) {
		console.log('api error', error);
	}
};
