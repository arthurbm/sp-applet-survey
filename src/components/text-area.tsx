import React, { useRef, useEffect, useState } from "react";
import { useFormContext, useController } from "react-hook-form";

import {
  Box,
  FormControl,
  FormLabel,
  FormLabelProps,
  FormErrorMessage,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";

interface FieldProps extends Omit<TextareaProps, "children"> {
  fieldName: string;
  label?: string;
  labelProps?: FormLabelProps;
}

export const TextAreaField = ({
  fieldName,
  label,
  labelProps,
  ...props
}: FieldProps) => {
  const { register } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [manualHeight, setManualHeight] = useState<number | null>(null);

  const {
    fieldState: { error },
  } = useController({
    name: fieldName,
  });

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      if (manualHeight === null) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      } else {
        const newHeight = Math.max(textarea.scrollHeight, manualHeight);
        textarea.style.height = `${newHeight}px`;
      }
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [manualHeight]);

  const handleInput = () => {
    adjustHeight();
  };

  const handleResize = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = event.target as HTMLTextAreaElement;
    setManualHeight(textarea.clientHeight);
  };

  const { ref: registerRef, ...registerRest } = register(fieldName);

  return (
    <Box w="full">
      <FormControl isInvalid={!!error}>
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
        <Textarea
          ref={(e) => {
            textareaRef.current = e;
            registerRef(e);
          }}
          onInput={handleInput}
          onMouseUp={handleResize}
          rows={3}
          overflow="hidden"
          resize="vertical"
          _focus={{
            borderColor: "#335DE6",
            boxShadow: `0 0 0 1px #335DE6`,
          }}
          _placeholder={{
            fontSize: "sm",
            fontWeight: "medium",
            color: "gray.300",
          }}
          {...registerRest}
          {...props}
        />
        {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};
