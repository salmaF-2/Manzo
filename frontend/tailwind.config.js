module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
    }
  },
  plugins: [],
  
}

