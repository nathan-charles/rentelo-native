import { StyleSheet } from 'react-native';

import theme from './../../config/theme';

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#c42933',
  },
  containerStyle: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  contentStyle: {
    padding: 15,
    flexGrow: 1,
    justifyContent: 'center',
  },
  textAppNameStyle: {
    color: '#F63440',
    fontSize: 60,
    fontWeight: 'bold',
  },
  textPoweredByStyle: {
    marginTop: -10,
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    alignSelf: 'flex-end',
  },
  inputContainerStyle: {
    paddingVertical: 10,
  },
  buttonContentStyle: {
    height: 44,
  },
  buttonTextStyle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonForgotPasswordStyle: {
    paddingVertical: 10,
    alignSelf: 'flex-end',
  },
  buttonForgotPasswordTextStyle: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
