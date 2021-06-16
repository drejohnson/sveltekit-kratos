import type {
	LoginFlow,
	RecoveryFlow,
	RegistrationFlow,
	SettingsFlow,
	VerificationFlow
} from '@ory/kratos-client';

export type KratosFlowType =
	| 'registration'
	| 'login'
	| 'settings'
	| 'verification'
	| 'recovery'
	| 'error';

export type AuthFlowType =
	| LoginFlow
	| RegistrationFlow
	| VerificationFlow
	| RecoveryFlow
	| SettingsFlow;

export interface Session {
	user: {
		email: string;
		username: string;
		first_name: string;
		last_name: string;
	};
}
