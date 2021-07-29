module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },

    extend: {
      maxWidth: {
        "2.5xl": "46.875rem",
      },

      fontSize: {
        "8.5xl": "6.25rem",
        0.9: "0.9375rem",
      },

      width: {
        62: "15.625rem",
        200: "31.25rem",
      },

      height: {
        0.25: "1px",
        13: "3.125rem",
        15: "3.75rem",
        26: "6.25rem",
        52: "12.5rem",
        100: "25rem",
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
          900: "#e68a00",
        },

        appDark: {
          50: "#eee",
          100: "#e9e9e9",
          500: "#555",
          600: "#3a3a3a",
          700: "#212121",
        },
      },
    },
  },
  variants: {
    extend: {
      margin: ["last"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
