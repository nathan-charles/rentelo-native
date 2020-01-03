import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#c42933',
  },
  containerStyle: {
    backgroundColor: '#F63440',
  },
  contentStyle: {
    padding: 15,
    flexGrow: 1,
    justifyContent: 'center',
  },
  textAppNameStyle: {
    color: '#FFF',
    fontSize: 60,
    fontWeight: 'bold',
  },
  textPoweredByStyle: {
    marginTop: -10,
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    alignSelf: 'flex-end',
  },
  inputContainerStyle: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c42933',
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  inputStyle: {
    color: '#FFF',
  },
  inputIconStyle: {
    marginLeft: 0,
    color: '#F6868D',
  },
  buttonGroupStyle: {
    flexDirection: 'row',
  },
  buttonDividerStyle: {
    width: 1,
  },
  buttonStyle: {
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  buttonTextStyle: {
    color: '#F63440',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonForgotPasswordStyle: {
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  buttonForgotPasswordTextStyle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
