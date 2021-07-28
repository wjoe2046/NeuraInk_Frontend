module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },

    extend: {
      fontSize: {
        "8.5xl": "6.25rem",
        0.9: "0.9375rem",
      },

      height: {
        13: "3.125rem",
        26: "6.25rem",
        0.25: "1px",
      },

      padding: {
        13: "3.125rem",
      },

      inset: {
        13: "3.125rem",
      },

      colors: {
        appYellow: {
          700: "#ffc107",
        },

        appDark: {
          700: "#212121",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
