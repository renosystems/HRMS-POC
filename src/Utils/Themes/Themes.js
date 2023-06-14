import { mergeTheme, defaultTheme } from "evergreen-ui";

const DefaultTheme = mergeTheme(defaultTheme, {
  components: {
    Button: {
      appearances: {
        main: {
          color: "white",
          paddingX: 12,
          paddingY: 8,
          borderRadius: 5,
          backgroundColor: "indianred",
          selectors: {
            _hover: {
              backgroundColor: "firebrick",
            },
            _active: {
              backgroundColor: "darkred",
            },
            _focus: {
              boxShadow: "0 0 0 2px lightcoral",
            },
          },
        },
      },
    },
  },
});

const SecondaryTheme = mergeTheme(defaultTheme, {
  components: {
    Button: {
      appearances: {
        main: {
          color: "white",
          paddingX: 12,
          paddingY: 8,
          borderRadius: 5,
          backgroundColor: "blue",
          selectors: {
            _hover: {
              backgroundColor: "blue",
            },
            _active: {
              backgroundColor: "blue",
            },
            _focus: {
              boxShadow: "0 0 0 2px blue",
            },
          },
        },
      },
    },
  },
});

const themes = {
  default: DefaultTheme,
  secondary: SecondaryTheme,
};

const getTheme = (id) => themes[id];

export { getTheme };
