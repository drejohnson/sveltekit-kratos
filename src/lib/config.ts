export const BASE_URL = 'http://localhost:3000';
export const KRATOS_BROWSER_URL = 'http://localhost:3000';
export const KRATOS_ADMIN_URL = 'http://localhost:4434';
export const KRATOS_PUBLIC_URL = 'http://localhost:4433';
export const SECURITY_MODE_COOKIE = 'cookie';
export const SECURITY_MODE_JWT = 'jwt';
export const JWKS_URL = '/';
export const PROJECT_NAME = 'Sveltekit Kratos';

const baseUrl = BASE_URL;

let securityMode = SECURITY_MODE_COOKIE;
let browserUrl = KRATOS_BROWSER_URL;
let publicUrl = KRATOS_PUBLIC_URL;

export default {
	kratos: {
		browser: browserUrl,
		admin: KRATOS_ADMIN_URL,
		public: publicUrl
	},
	baseUrl,
	jwksUrl: JWKS_URL,
	projectName: PROJECT_NAME,

	securityMode,
	SECURITY_MODE_JWT,
	SECURITY_MODE_COOKIE
};
