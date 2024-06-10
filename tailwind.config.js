/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
		},
		screens: {
			mobile: '640px',
			// => @media (min-width: 640px) { ... }

			tablet: '768px',
			// => @media (min-width: 768px) { ... }

			ipad: '1024px',
			// => @media (min-width: 1024px) { ... }

			laptop: '1280px',
			// => @media (min-width: 1280px) { ... }

			desktop: '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		colors: {
			action: {
				error: '#E53835',
				success: '#1D8E36',
				warning: '#FBC02D',
			},
			overlay: '#a5b4be',
			neutral: {
				grey: '#a5b4be',
				black: '#000000',
				white: '#fcfdfe',
				darkRed: '#700303',
			},
			primary: {
				lightblue: '#266491',
			},
		},
		backgroundImage: {
			'custom-gradient':
				'linear-gradient(90deg, rgba(14,36,52,1) 0%, rgba(38,100,144,1) 42%, rgba(38,100,145,1) 42%, rgba(41,106,154,1) 100%)',
		},
	},
	plugins: [],
};
