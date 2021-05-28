import type { Load } from '@sveltejs/kit';
import { Configuration, PublicApi, AdminApi } from '@ory/kratos-client';
import config from '$lib/config';
import { isString, redirectOnError } from '$lib/helpers';
import type { KratosFlowType } from '$lib/types';

export const createLoad = (flowType: KratosFlowType) => {
	const kratos =
		flowType === 'settings'
			? new AdminApi(new Configuration({ basePath: config.kratos.admin }))
			: new PublicApi(new Configuration({ basePath: config.kratos.public }));

	const load: Load = async ({ page }) => {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				redirect: `${config.kratos.public}/self-service/${flowType}/browser`,
				status: 302
			};
		}

		try {
			let authFlow =
				flowType === 'login'
					? 'getSelfServiceLoginFlow'
					: flowType === 'registration'
					? 'getSelfServiceRegistrationFlow'
					: flowType === 'recovery'
					? 'getSelfServiceRecoveryFlow'
					: flowType === 'verification'
					? 'getSelfServiceVerificationFlow'
					: 'getSelfServiceSettingsFlow';

			const { status, data: flow } = await kratos[authFlow](flowID);

			if (status !== 200) {
				Promise.reject(flow);
			}

			return {
				props: {
					ui: flow.ui
				}
			};
		} catch (error) {
			return redirectOnError(error, `/self-service/${flowType}/browser`);
		}
	};

	return load;
};
