type SecurityMode = 'cookie' | 'jwt';

const baseUrl = import.meta.env.VITE_BASE_URL || '/';

let securityMode: SecurityMode = import.meta.env.VITE_SECURITY_MODE || 'cookie';
let browserUrl = import.meta.env.VITE_KRATOS_BROWSER_URL || 'http://localhost:3000';
let publicUrl = import.meta.env.VITE_KRATOS_PUBLIC_URL;
let adminUrl = import.meta.env.VITE_KRATOS_ADMIN_URL;
let jwksUrl = import.meta.env.VITE_JWKS_URL || '/';
let projectName = 'Sveltekit Kratos';

export default {
	kratos: {
		browser: browserUrl,
		admin: adminUrl,
		public: publicUrl
	},
	baseUrl,
	jwksUrl,
	projectName,
	securityMode
};
