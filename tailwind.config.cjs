const colors = require('tailwindcss/colors');

module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			display: ['Bebas Neue', 'cursive'],
			sans: ['Poppins', 'sans-serif'],
			body: ['Poppins', 'sans-serif']
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			red: colors.red,
			yellow: colors.amber,
			blue: colors.blue,
			indigo: colors.indigo
		},
		extend: {
			width: {
				'100px': '100px',
				'150px': '150px',
				'200px': '200px',
				'300px': '300px',
				'400px': '400px',
				'500px': '500px'
			},
			height: {
				'screen-90': '90vh',
				'screen-80': '80vh',
				'100px': '100px',
				'200px': '200px',
				'300px': '300px',
				'400px': '400px',
				'500px': '500px'
			},
			zIndex: {
				negative: '-1'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
