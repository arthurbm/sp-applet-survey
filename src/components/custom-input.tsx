import React from 'react';
import { Box, FormControl, FormLabel, Input, FormErrorMessage, InputProps, FormLabelProps } from '@chakra-ui/react';
import { Controller, Control, FieldError } from 'react-hook-form';

type CustomInputProps = InputProps & {
  label: string;
  placeholder?: string;
  fieldName: string;
  control: Control<any>;
  error?: FieldError;
  labelProps?: FormLabelProps;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder = '',
  fieldName,
  control,
  error,
  labelProps = {},
  ...props
}) => {
  return (
    <Box w="full">
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={fieldName} fontSize="sm" fontWeight="semibold" color="gray.400" {...labelProps}>
          {label}
        </FormLabel>
        <Controller
          name={fieldName}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={placeholder}
              _placeholder={{
                fontSize: 'sm',
                fontWeight: 'medium',
                color: 'gray.300',
              }}
              {...props}
            />
          )}
        />
        {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
      </FormControl>
    </Box>
  );
};

