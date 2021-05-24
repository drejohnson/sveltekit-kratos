export const SECURITY_MODE_STANDALONE = 'cookie';
export const SECURITY_MODE_JWT = 'jwt';

const baseUrl = import.meta.env.BASE_URL || '/';

let securityMode = SECURITY_MODE_STANDALONE;
let browserUrl = import.meta.env.VITE_KRATOS_BROWSER_URL || '';
let publicUrl = import.meta.env.VITE_KRATOS_PUBLIC_URL || '';
switch ((import.meta.env.VITE_SECURITY_MODE || '').toLowerCase()) {
  case 'jwt':
  case 'oathkeeper':
    securityMode = SECURITY_MODE_JWT;
    break;
  case 'cookie':
  case 'standalone':
  default:
    securityMode = SECURITY_MODE_STANDALONE;
}

export default {
  kratos: {
    browser: browserUrl.replace(/\/+$/, ''),
    admin: (import.meta.env.VITE_KRATOS_ADMIN_URL || '').replace(/\/+$/, ''),
    public: publicUrl.replace(/\/+$/, ''),
  },
  baseUrl,
  jwksUrl: import.meta.env.VITE_JWKS_URL || '/',
  projectName: import.meta.env.VITE_PROJECT_NAME || 'SecureApp',

  securityMode,
  SECURITY_MODE_JWT,
  SECURITY_MODE_STANDALONE,

  https: {
    enabled:
      import.meta.env.hasOwnProperty('VITE_TLS_KEY_PATH') &&
      import.meta.env.hasOwnProperty('VITE_TLS_CERT_PATH'),
    certificatePath: import.meta.env.VITE_TLS_CERT_PATH || '',
    keyPath: import.meta.env.VITE_TLS_KEY_PATH || '',
  },
};
