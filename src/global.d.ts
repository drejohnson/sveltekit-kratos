/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
	VITE_BASE_URL: string;
	VITE_APPLE_ID: string;
	VITE_APPLE_TEAM_ID: string;
	VITE_APPLE_PRIVATE_KEY: string;
	VITE_APPLE_KEY_ID: string;
	VITE_GOOGLE_CLIENT_ID: string;
	VITE_GOOGLE_CLIENT_SECRET: string;
	VITE_FACEBOOK_CLIENT_ID: string;
	VITE_FACEBOOK_CLIENT_SECRET: string;
	VITE_TWITTER_API_KEY: string;
	VITE_TWITTER_API_SECRET: string;
	VITE_REDDIT_API_KEY: string;
	VITE_KRATOS_BROWSER_URL: string;
	VITE_KRATOS_PUBLIC_URL: string;
	VITE_KRATOS_ADMIN_URL: string;
	VITE_JWKS_URL: string;
	VITE_SECURITY_MODE: string;
}
