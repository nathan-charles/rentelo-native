import React from 'react';
import { TextInputProps } from 'react-native';
import { Input } from 'native-base';

import colors from '../../../src/config/colors';
import InputWrapper from '../input-wrapper';
import styles from './input-field.styles';

interface InputFieldProps extends TextInputProps {
  label?: string;
  note?: string;
  formikKey: string;
  formikProps: any;
}

const InputField: React.FC<InputFieldProps> = ({ multiline, label, note, formikProps, formikKey, ...inputProps }) => {
  return (
    <InputWrapper label={label} note={note} formikKey={formikKey} formikProps={formikProps}>
      <Input
        style={multiline ? styles.inputMultilineStyle : styles.inputStyle}
        multiline={multiline}
        selectionColor={colors.primaryColor}
        placeholderTextColor="#DCDCDC"
        value={formikProps.values[formikKey]}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...inputProps}
      />
    </InputWrapper>
  );
};

export default InputField;
