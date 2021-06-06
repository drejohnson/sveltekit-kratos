<<<<<<< HEAD
type SecurityMode = 'cookie' | 'jwt';

const baseUrl = import.meta.env.VITE_BASE_URL || '/';

let securityMode: SecurityMode = import.meta.env.VITE_SECURITY_MODE || 'cookie';
let browserUrl = import.meta.env.VITE_KRATOS_BROWSER_URL || 'http://localhost:3000';
let publicUrl = import.meta.env.VITE_KRATOS_PUBLIC_URL;
let adminUrl = import.meta.env.VITE_KRATOS_ADMIN_URL;
let jwksUrl = import.meta.env.VITE_JWKS_URL || '/';
let projectName = 'Sveltekit Kratos';
=======
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
export const KRATOS_BROWSER_URL = 'http://localhost:3000';
export const KRATOS_ADMIN_URL = 'http://localhost:4434';
export const KRATOS_PUBLIC_URL = 'http://localhost:4433';
export const SECURITY_MODE_COOKIE = 'cookie';
export const SECURITY_MODE_JWT = 'jwt';
export const JWKS_URL = `${BASE_URL}/.well-known/jwks.json`;
export const PROJECT_NAME = 'Sveltekit Kratos';

type SecurityMode = 'cookie' | 'jwt';

const baseUrl = BASE_URL;

let securityMode: SecurityMode = 'cookie';
let browserUrl = KRATOS_BROWSER_URL;
let publicUrl = KRATOS_PUBLIC_URL;
>>>>>>> Initial commit

export default {
	kratos: {
		browser: browserUrl,
<<<<<<< HEAD
		admin: adminUrl,
		public: publicUrl
	},
	baseUrl,
	jwksUrl,
	projectName,
=======
		admin: KRATOS_ADMIN_URL,
		public: publicUrl
	},
	baseUrl,
	jwksUrl: JWKS_URL,
	projectName: PROJECT_NAME,

>>>>>>> Initial commit
	securityMode
};
