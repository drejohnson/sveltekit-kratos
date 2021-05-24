module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Bebas Neue', 'cursive'],
      sans: ['Poppins', 'sans-serif'],
      body: ['Poppins', 'sans-serif'],
    },
		extend: {
      width: {
        '100px': '100px',
        '150px': '150px',
        '200px': '200px',
        '300px': '300px',
        '400px': '400px',
        '500px': '500px',
      },
      height: {
        'screen-90': '90vh',
        'screen-80': '80vh',
        '100px': '100px',
        '200px': '200px',
        '300px': '300px',
        '400px': '400px',
        '500px': '500px',
      },
      zIndex: {
        negative: '-1',
      },
    },
	},
  variants: {
		extend: {},
	},
  plugins: []
}