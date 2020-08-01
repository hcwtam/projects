import React from 'react';

import Input from './Input';
// import Textarea from './Textarea';
// import Select from './Select';
// import RadioButtons from './RadioButtons';
// import CheckboxGroup from './CheckboxGroup';
// import DatePicker from './DatePicker';
// import ChakraInput from './ChakraInput';
type AppProps = {
  control: string;
  type: string;
  label: string;
  name: string;
};

function FormikControl({ control, ...rest }: AppProps): JSX.Element | null {
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    // case 'textarea':
    //   return <Textarea {...rest} />;
    // case 'select':
    //   return <Select {...rest} />;
    // case 'radio':
    //   return <RadioButtons {...rest} />;
    // case 'checkbox':
    //   return <CheckboxGroup {...rest} />;
    // case 'date':
    //   return <DatePicker {...rest} />;
    // case 'chakrainput':
    //   return <ChakraInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
