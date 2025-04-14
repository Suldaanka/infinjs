module.exports = {
    theme: {
      extend: {
        borderWidth: {
          '3': '3px',
        },
        keyframes: {
          loaderSpin: {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          }
        },
        animation: {
          'spin': 'loaderSpin 1s linear infinite',
        }
      }
    },
    // rest of your config
  }