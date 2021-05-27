<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	@layer components {
		.field {
			@apply relative flex flex-col mt-4;
		}
		.input {
			@apply flex items-center w-full h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2;
		}
	}
</style>
