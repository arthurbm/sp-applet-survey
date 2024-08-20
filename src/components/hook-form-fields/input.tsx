import { useState } from "react";
import { useFormContext, useController } from "react-hook-form";

import {
  Box,
  FormControl,
  FormLabel,
  FormLabelProps,
  FormErrorMessage,
  Input,
  InputProps,
  InputGroup,
  InputRightElement,
  Icon,
  IconButton,
  useTheme,
} from "@chakra-ui/react";
import { IconStEye, IconStEyeClosed } from "../icons";

interface FieldProps extends InputProps {
  fieldName: string;
  label?: string;
  labelProps?: FormLabelProps;
  isRequired?: boolean;
}

export const InputField = ({
  fieldName,
  label,
  labelProps,
  type,
  isRequired,
  ...props
}: FieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const { register } = useFormContext();

  const {
    fieldState: { error },
  } = useController({
    name: fieldName,
  });

  const theme = useTheme() as { colors: any };

  return (
    <Box w="full">
      <FormControl isInvalid={!!error} isRequired={isRequired}>
        {label && (
          <FormLabel
            htmlFor={fieldName}
            fontSize="md"
            fontWeight="medium"
            color="gray.400"
            {...labelProps}
          >
            {label}
          </FormLabel>
        )}
        <InputGroup size="md">
          <Input
            type={inputType}
            autoComplete="false"
            _focus={{
              borderColor: theme.colors.input_border,
              boxShadow: `0 0 0 1px ${theme.colors.input_border}`,
            }}
            _placeholder={{
              fontSize: "sm",
              fontWeight: "medium",
              color: "gray.300",
            }}
            {...register(fieldName)}
            {...props}
          />
          {isPassword && (
            <InputRightElement mr={1}>
              <IconButton
                aria-label="Toggle password visibility"
                h={4}
                size="sd"
                fontSize="2xl"
                _hover={{ bg: "none" }}
                _focus={{ border: "none" }}
                _active={{
                  bg: "none",
                  border: "none",
                }}
                background="none"
                onClick={() => setShowPassword(!showPassword)}
                icon={<Icon as={showPassword ? IconStEye : IconStEyeClosed} />}
              />
            </InputRightElement>
          )}
        </InputGroup>
        {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
