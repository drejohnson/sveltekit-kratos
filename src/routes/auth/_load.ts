import type { Load } from '@sveltejs/kit';
import config from '$lib/config';
import { isString } from '$lib/helpers';
import type { AuthFlowType, KratosFlowType } from '$lib/types';

export const createLoad = (flowType: KratosFlowType) => {
	const load: Load = async ({ page, fetch }) => {
		const flowID = page.query.get('flow');

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

		const { data: flow }: { status: number; data: AuthFlowType } = await res.json();

		return {
			props: {
				ui: flow.ui
			}
		};
	};

	return load;
};
