import { ComponentStyleConfig, theme } from "@chakra-ui/react";

const NavLink: ComponentStyleConfig = {
  ...theme.components.Button,
  variants: {
    nav: (props) => {
      return {
        ...(theme.components.Button.variants?.ghost ?? {}),
        display: "inline-flex",
        alignItems: "center",
        w: "full",
        py: 2,
        justifyContent: "flex-start",
        textAlign: "left",
        color: "blue.200",
        fontWeight: "semibold",
        fontSize: "sm",

        _active: {
          color: "white",
          background: "var(--chakra-colors-blue-600)",
          backgroundColor: "blue.600",
          strokeWidth: 1,
        },

        _hover: {
          backgroundColor: "blue.300",
        },
      };
    },
  },
};

export default NavLink;
