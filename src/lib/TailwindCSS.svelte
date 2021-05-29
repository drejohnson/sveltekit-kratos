<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@layer components {
		.field {
			@apply relative flex mt-4;
		}
		.form-label_settings {
			@apply flex items-center w-1/4 text-lg text-gray-500;
		}
		.input {
			@apply flex items-center w-full h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2;
		}
	}
</style>
