import type { Load } from '@sveltejs/kit';
import { Configuration, PublicApi } from '@ory/kratos-client';
import config from '$lib/config';
import { isString, redirectOnError } from '$lib/helpers';
import type { KratosFlowType } from '$lib/types';

export const createLoad = (flowType: KratosFlowType, path: string) => {
	const kratos = new PublicApi(new Configuration({ basePath: config.kratos.public }));

	const load: Load = async ({ page }) => {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				redirect: `${config.kratos.public}${path}`,
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
					: 'getSelfServiceLoginFlow';

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
			return redirectOnError(error, path);
		}
	};

	return load;
};
