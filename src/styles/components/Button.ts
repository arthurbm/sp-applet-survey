import { ComponentStyleConfig, theme } from "@chakra-ui/react";

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "medium",
  },
  variants: {
    nav: {
      ...(theme.components.Button.variants?.ghost ?? {}),
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
    },
    control: {
      px: 3,
      height: 9,
      bg: "gray.180",
      color: "gray.300",
      fontSize: "xs",
      fontWeight: "bold",
      borderRadius: "lg",
      _hover: {
        bg: "gray.200",
        color: "gray.400",
      },
      _focus: {
        bg: "gray.180",
        color: "gray.300",
      },
      _pressed: {
        bg: "gray.200",
        color: "gray.400",
      },
    },
  },
};

export default Button;
