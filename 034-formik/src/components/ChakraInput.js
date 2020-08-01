import React from 'react';
import { Field } from 'formik';
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/core';

function ChakraInput({ label, name, ...rest }) {
  return (
    <div className="form-control">
      <Field id={name} name={name}>
        {({ field, form }) => {
          return (
            <FormControl isInvalid={form.errors[name] && form.touched[name]}>
              <FormLabel htmlFor={name}>{label}</FormLabel>
              <Input id={name} {...rest} {...field} />
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
    </div>
  );
}

export default ChakraInput;
