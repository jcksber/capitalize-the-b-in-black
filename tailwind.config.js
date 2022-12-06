module.exports = {
  content: [
    './components/**/*.{html,js}',
    './pages/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'moriston': ['MoristonPersonal-Regular', 'sans-serif'],
        'moriston-bold': ['MoristonPersonal-Bold', 'sans-serif'],
        'moriston-black': ['MoristonPersonal-Black', 'sans-serif'],
        'moriston-light': ['MoristonPersonal-Light', 'sans-serif'],
        'moriston-medium': ['MoristonPersonal-Medium', 'sans-serif'],
        'moriston-semi': ['MoristonPersonal-Semibold', 'sans-serif'],
      },
      letterSpacing:{
        'dream': '.35em',
        'juice': '.75em',
        'light': '.3em',
      },
      colors: {
        yellow: {
          main: '#FCE54C',
          faded: '#EDD500'
        },
        gray: {
          'roadmap-heading': '#303030',
          'roadmap-bg': '#444444',
          'roadmap-divider': '#202020',
        }
      },
      backgroundImage: {
        'hero-image': "url('../public/hero_bg.png')",
        'feature': "url('../public/feature_bg.png')",
        'bodega-bg': "url('../public/bodega_bg_darkened.png')",
      },
      screens: {
        'xs': '420px',
        'mini': '550px',
        'tiny': '350px',
        'laptop': '1500px'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
  },
}
