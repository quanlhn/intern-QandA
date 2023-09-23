import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login': 'url(/public/20988.jpg)'
      },

    },
    colors: {
      primary: '#441151',
            secondary: '#EE85B5',
            violet: '#883677',
            cc: '##FF958C',
            success: '#5FC790',
            warning: '#FFA600',
            danger: '#FF5630',
            dark: '#2E3A44',
            info: '#1CA7EC',
            black: '#2E3A44',
            grey1: '#A0AABF',
            grey2: '#C0C6D4',
            grey3: '#E3E8F1',
            grey4: '#e8e1d1',
            grey5: '#EAEAEA',
            light: '#F9FBFC',
            white: '#FFF',
            color4: '#222831',
            color3: '#393E46',
            color2: '#00ADB5',
            color1: '#EEEEEE',
            custom1: '#8693AB',
            custom2: '#BDD4E7',
            red1: '#f14b2f',
            transparent: 'transparent',
            headerbg: '#FFE6B5',
            searchbg: '#FBE6BE',
            textcolor: '#1B0440',
            orange: '#E69525',
            hover: "#FFF8CC",
            focus: '#F7E469',
            orange2: '#fcaf17',
            lightgreen: '#52c41a'
    },
    fontFamily: {
      'sans': ['Helvetica', 'Arial', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'],
      'tangerine': ['Tangerine', 'cursive'],
    }
  },
  plugins: [],
}
export default config
