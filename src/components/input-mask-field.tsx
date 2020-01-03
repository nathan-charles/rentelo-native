import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'native-base';
import { TextInputMask, MaskService, TextInputMaskProps } from 'react-native-masked-text';

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

interface InputFieldProps extends TextInputMaskProps {
  label?: string;
  note?: string;
  formikKey: string;
  formikProps?: any;
}

const InputMaskField: React.FC<InputFieldProps> = ({ label, note, formikProps, formikKey, ...inputProps }) => {
  return (
    <InputWrapper label={label} note={note} formikKey={formikKey} formikProps={formikProps}>
      <TextInputMask
        customTextInput={Input}
        style={styles.inputStyle}
        selectionColor={colors.primaryColor}
        placeholderTextColor="#DCDCDC"
        value={formikProps.values[formikKey]}
        onChangeText={text => {
          const { type, options } = inputProps;
          const raw = type === 'custom' ? MaskService.toRawValue(type, text, options) : text;
          // console.log(raw);
          formikProps.handleChange(formikKey)(raw);
        }}
        onBlur={formikProps.handleBlur(formikKey)}
        {...inputProps}
      />
    </InputWrapper>
  );
};

export default InputMaskField;
