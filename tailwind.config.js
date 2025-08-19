// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)' },
        }
      },
      animation: {
        gradient: 'gradient 6s ease infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
      backgroundSize: {
        '200': '200% 200%', // smoother gradient shift
      }
    }
  }
}
