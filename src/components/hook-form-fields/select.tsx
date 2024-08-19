import { useFormContext, useController } from "react-hook-form";

import {
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SelectProps,
  FormLabelProps,
} from "@chakra-ui/react";

interface SelectFieldProps extends SelectProps {
  label?: string;
  labelProps?: FormLabelProps;
  fieldName: string;
}

export const SelectField = ({
  label,
  labelProps,
  fieldName,
  children,
  ...props
}: SelectFieldProps) => {
  const { control, setValue } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name: fieldName,
  });

  const handleChange = (name: string, value: string) => {
    setValue(name, value);
  };

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={fieldName} {...labelProps}>
        {label}
      </FormLabel>
      <Select
        onChange={(e) => {
          handleChange(fieldName, e.target.value);
          field.onChange(e);
        }}
        value={field.value}
        {...props}
      >
        {children}
      </Select>
      {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
};
