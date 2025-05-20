/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        float3D: {
          '0%': { transform: 'translateY(0px) rotateY(0deg)' },
          '25%': { transform: 'translateY(-10px) rotateY(5deg)' },
          '50%': { transform: 'translateY(0px) rotateY(0deg)' },
          '75%': { transform: 'translateY(-10px) rotateY(-5deg)' },
          '100%': { transform: 'translateY(0px) rotateY(0deg)' },
        },
        glowPulse: {
          '0%': { textShadow: '0 0 5px rgba(242, 197, 33, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(242, 197, 33, 0.8)' },
          '100%': { textShadow: '0 0 5px rgba(242, 197, 33, 0.5)' },
        },
        slideInLeft: {
          'from': { 
            opacity: '0',
            transform: 'translateX(-50px) scale(0.8)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateX(0) scale(1)'
          },
        },
        slideInRight: {
          'from': { 
            opacity: '0',
            transform: 'translateX(50px) scale(0.8)'
          },
          'to': { 
            opacity: '1',
            transform: 'translateX(0) scale(1)'
          },
        },
        scaleIn: {
          'from': { 
            opacity: '0',
            transform: 'scale(0.5)'
          },
          'to': { 
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        coinHover: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-5px) rotate(5deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        coinPulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(242, 197, 33, 0.4)' },
          '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(242, 197, 33, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(242, 197, 33, 0)' },
        },
        coinSpin: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        }
      },
      animation: {
        'float3d': 'float3D 4s ease-in-out infinite',
        'glow': 'glowPulse 2s ease-in-out infinite',
        'slide-left': 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-right': 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'coin-hover': 'coinHover 2s ease-in-out infinite',
        'coin-pulse': 'coinPulse 2s ease-in-out infinite',
        'coin-spin': 'coinSpin 1s linear infinite',
      },
    },
  },
  plugins: [],
}

