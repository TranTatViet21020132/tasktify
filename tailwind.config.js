/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				light: {
  					'500': '#6b8afd'
  				},
  				dark: {
  					'500': '#6b8afd'
  				},
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			accent: {
  				light: {
  					'400': '#FFFFFF',
  					'500': '#F8F8F8',
  					'600': '#F8F8F8'
  				},
  				dark: {
  					'400': '#131313',
  					'500': '#2e333d',
  					'600': '#202329'
  				},
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			text: {
  				light: {
  					'400': '#85878C',
  					'500': '#A9AEBA',
  					'600': '#131313'
  				},
  				dark: {
  					'400': '#85878C',
  					'500': '#A9AEBA',
  					'600': '#FFFFFF'
  				}
  			},
  			success: {
  				'400': '#86D983',
  				'500': '#00C77A',
  				'600': '#008735'
  			},
  			warning: {
  				'100': '#FFD388',
  				'500': '#FFF0EF',
  				'600': '#EA8A32'
  			},
  			danger: {
  				'100': '#FFCBCB',
  				'500': '#FF4040',
  				'600': '#CC3333'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			archivo: [
  				'Archivo',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			h1: [
  				'72px',
  				{
  					lineHeight: '105%',
  					letterSpacing: '0%'
  				}
  			],
  			h2: [
  				'56px',
  				{
  					lineHeight: '115%',
  					letterSpacing: '0%'
  				}
  			],
  			h3: [
  				'48px',
  				{
  					lineHeight: '115%',
  					letterSpacing: '0%'
  				}
  			],
  			h4: [
  				'32px',
  				{
  					lineHeight: '125%',
  					letterSpacing: '0%'
  				}
  			],
  			h5: [
  				'24px',
  				{
  					lineHeight: '130%',
  					letterSpacing: '0%'
  				}
  			],
  			h6: [
  				'20px',
  				{
  					lineHeight: '130%',
  					letterSpacing: '0%'
  				}
  			],
  			subheading1: [
  				'24px',
  				{
  					lineHeight: '121%',
  					letterSpacing: '0%'
  				}
  			],
  			subheading2: [
  				'20px',
  				{
  					lineHeight: '131%',
  					letterSpacing: '0%'
  				}
  			],
  			subheading3: [
  				'16px',
  				{
  					lineHeight: '138%',
  					letterSpacing: '0%'
  				}
  			],
  			subheading4: [
  				'14px',
  				{
  					lineHeight: '146%',
  					letterSpacing: '0%'
  				}
  			],
  			body1: [
  				'24px',
  				{
  					lineHeight: '146%',
  					letterSpacing: '0%'
  				}
  			],
  			body2: [
  				'20px',
  				{
  					lineHeight: '156%',
  					letterSpacing: '0%'
  				}
  			],
  			body3: [
  				'18px',
  				{
  					lineHeight: '153%',
  					letterSpacing: '0%'
  				}
  			],
  			body4: [
  				'16px',
  				{
  					lineHeight: '150%',
  					letterSpacing: '0%'
  				}
  			],
  			body5: [
  				'14px',
  				{
  					lineHeight: '157%',
  					letterSpacing: '0%'
  				}
  			]
  		},
  		fontWeight: {
  			bold: 700,
  			regular: 400
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}