/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
		},
		screens: {
			bimobile: '496px',
			mobile: '640px',
			tablet: '768px',
			ipad: '1024px',
			laptop: '1280px',
			desktop: '1536px',
		},
		extend: {
			colors: {
				action: {
					error: '#E53835',
					success: '#1D8E36',
					warning: '#FBC02D',
				},
				inputCaption: '#858585',
				inputBg: '#d9d9d9',
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
				modalOverlay: 'rgba(0, 0, 0, 0.5)',
				evenRawsbg: '#DDDDDD',
			},
			backgroundImage: {
				'custom-gradient':
					'linear-gradient(90deg, rgba(14,36,52,1) 0%, rgba(38,100,144,1) 42%, rgba(38,100,145,1) 42%, rgba(41,106,154,1) 100%)',
				authenticationBackgroundImage:
					'url("./src/assets/register-login-background.svg")',
			},
			boxShadow: {
				'inner-bottom':
					'inset 0 -4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
				'bottom-left-right':
					'2px 2px 4px rgba(0, 0, 0, 0.5), -2px 2px 4px rgba(0, 0, 0, 0.5)',
				'dark-lg':
					'0 10px 10px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
			},
			transparent: 'transparent', // Add this line for transparent background
		},
		backgroundImage: {
			'custom-gradient':
				'linear-gradient(90deg, rgba(14,36,52,1) 0%, rgba(38,100,144,1) 42%, rgba(38,100,145,1) 42%, rgba(41,106,154,1) 100%)',
			authenticationBackgroundImage:
				'url("./src/assets/register-login-background.svg")',
		},
		boxShadow: {
			'inner-bottom':
				'inset 0 -4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
			'bottom-left-right':
				'2px 2px 4px rgba(0, 0, 0, 0.5), -2px 2px 4px rgba(0, 0, 0, 0.5)',
			'dark-lg':
				'0 10px 10px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
			'custom-light': '0 2px 4px rgba(0, 0, 0, 0.1)',
			'custom-medium': '0 4px 8px rgba(0, 0, 0, 0.2)',
			'custom-heavy': '0 8px 16px rgba(0, 0, 0, 0.4)',
		},
	},
	variants: {
		extend: {
			boxShadow: ['responsive', 'hover', 'focus'],
		},
	},
	plugins: [],
};
