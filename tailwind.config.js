module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
          light1: "var(--bg-light-1)",
          light2: "var(--bg-light-2)",
          white: "var(--bg-white)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted1: "var(--text-muted-1)",
          muted2: "var(--text-muted-2)",
          muted3: "var(--text-muted-3)",
          white: "var(--text-white)"
        },
        button: {
          background: "var(--button-bg)",
          text: "var(--button-text)"
        }
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
};