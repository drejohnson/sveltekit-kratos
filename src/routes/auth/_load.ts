import type { Load } from '@sveltejs/kit';
import config from '$lib/config';
import { isString, redirectOnError } from '$lib/helpers';
import type { KratosFlowType } from '$lib/types';

export const createLoad = (flowType: KratosFlowType) => {
	const load: Load = async ({ page, fetch }) => {
		const flowID = page.query.get('flow');

		if (!flowID || !isString(flowID)) {
			return {
				redirect: `${config.kratos.public}/self-service/${flowType}/browser`,
				status: 302
			};
		}

		try {
			const res = await fetch(`/api/auth/${flowType}`, {
				headers: {
					flow_id: flowID
				}
			});

			if (res.ok) {
				const { status, data: flow } = await res.json();

				if (status !== 200) {
					Promise.reject(flow);
				}

				return {
					props: { ui: flow.ui }
				};
			}
			return redirectOnError(res, `/self-service/${flowType}/browser`);
		} catch (error) {
			console.log('catch error', error);
		}
	};

	return load;
};
