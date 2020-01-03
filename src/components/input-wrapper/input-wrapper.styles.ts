import { StyleSheet } from 'react-native';

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

export default styles;
