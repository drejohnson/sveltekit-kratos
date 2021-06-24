import type { Request } from '@sveltejs/kit';
import type { ErrorResponse } from '@ory/kratos-client';
import type { AuthFlowType } from '$lib/types';
import { kratosAdminApi } from '$lib/services/kratos';

export const get = async (req: Request) => {
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
		const {
			status,
			data
		}: { status: number; data: AuthFlowType | ErrorResponse } = await kratosAdminApi[authFlow](
			flowType === 'error' ? error : flowId
		);

		return {
			body: { data },
			status,
			headers: {
				'Content-Type': 'application/json'
			}
		};
	} catch {}
};
