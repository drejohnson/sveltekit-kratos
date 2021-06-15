export type KratosFlowType =
	| 'registration'
	| 'login'
	| 'settings'
	| 'verification'
	| 'recovery'
	| 'error';

export interface Session {
	user: {
		email: string;
		username: string;
		first_name: string;
		last_name: string;
	};
}
