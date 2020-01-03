import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Label, Text } from 'native-base';

// import colors from '../../src/config/colors';

const styles = StyleSheet.create({
  containerStyle: {
    marginVertical: 4,
  },
  inputWrapperStyle: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  inputWrapperErrorStyle: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'red',
    backgroundColor: '#FFF',
  },
  inputLabelStyle: {
    paddingTop: 6,
    fontSize: 10,
    fontWeight: '500',
  },
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
  noteStyle: {
    marginVertical: 4,
  },
  noteStyleError: {
    marginVertical: 4,
    color: 'red',
  },
});

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
