import { mergeTheme, defaultTheme } from "evergreen-ui";

const DefaultTheme = mergeTheme(defaultTheme, {
  components: {
    Button: {
      appearances: {
        main: {
          color: "white",
          paddingY: 25,
          borderRadius: 5,
          backgroundColor: "grey",
          selectors: {
            _hover: {
              backgroundColor: "grey",
            },
            _active: {
              backgroundColor: "grey",
            },
            _focus: {
              boxShadow: "0 0 0 2px grey",
            },
          },
        },
      },
    },

    Input: {
      baseStyle: {
        backgroundColor: "grey",
        borderColor: "black",
      },
    },

    Checkbox: {
      baseStyle: {
        backgroundColor: "grey",
        borderColor: "black",
        selectors: {
          _focus: {
            boxShadow: "0 0 0 2px grey",
          },
          _checked: {
            backgroundColor: "grey !important",
          },
        },
      },
    },

    Label: {
      baseStyle: {
        color: "grey",
        fontWeight: "900",
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
          paddingY: 25,
          borderRadius: 5,
          backgroundColor: "grey",
          selectors: {
            _hover: {
              backgroundColor: "grey",
            },
            _active: {
              backgroundColor: "grey",
            },
            _focus: {
              boxShadow: "0 0 0 2px grey",
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
