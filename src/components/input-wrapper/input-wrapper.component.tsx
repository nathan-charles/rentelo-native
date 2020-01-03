import React from 'react';
import { View, Label, Text } from 'native-base';

import styles from './input-wrapper.styles';

interface InputWrapperProps {
  label?: string;
  note?: string;
  formikKey: string;
  formikProps: any;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ children, label, note, formikKey, formikProps }) => {
  let error = false;

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    // style.inputStyles.borderColor = 'red';
    error = true;
  }

  return (
    <View style={styles.containerStyle}>
      <View style={error ? styles.inputWrapperErrorStyle : styles.inputWrapperStyle}>
        <Label style={styles.inputLabelStyle}>{label.toUpperCase()}</Label>
        {children}
      </View>
      {error && (
        <Text note style={styles.noteStyleError}>
          {formikProps.errors[formikKey]}
        </Text>
      )}
      {note && (
        <Text note style={styles.noteStyle}>
          {note}
        </Text>
      )}
    </View>
  );
};

export default InputWrapper;
