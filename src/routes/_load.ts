import type { Load } from '@sveltejs/kit';
import type { UserSession } from '$lib/types';

export const createLoad = (path?: string) => {
	const load: Load = async ({ session }: { session: UserSession }) => {
		if (session.user) {
			return {
				props: {
					session
				}
			};
		}

		return {
			status: 302,
			redirect: path || '/auth/login'
		};
	};

	return load;
};
