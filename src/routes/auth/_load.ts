import type { Load } from '@sveltejs/kit';
import config from '$lib/config';
import { isString } from '$lib/helpers';
import type { AuthFlowType, KratosFlowType } from '$lib/types';

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

			if (!res.ok) {
				return {
					status: 302,
					redirect: `${config.kratos.public}/self-service/${flowType}/browser`
				};
			}

			const { status, data: flow }: { status: number; data: AuthFlowType } = await res.json();

			if (status !== 200) {
				throw flow;
			}

			return {
				props: {
					ui: flow.ui
				}
			};
		} catch (error) {
			console.log(error);
		}
	};

	return load;
};
