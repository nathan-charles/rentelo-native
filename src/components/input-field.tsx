import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import { Input } from 'native-base';

import colors from '../../src/config/colors';
import InputWrapper from './input-wrapper';

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    paddingLeft: 0,
    paddingRight: 0,
  },
  inputMultilineStyle: {
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 0,
    paddingRight: 0,
  },
});

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
