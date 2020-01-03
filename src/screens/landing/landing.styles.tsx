import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#c42933',
  },
  containerStyle: {
    backgroundColor: '#F63440',
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
  buttonGroupStyle: {
    flexDirection: 'row',
  },
  buttonDividerStyle: {
    width: 1,
  },
  buttonStyle: {
    flex: 1,
    height: 60,
    backgroundColor: '#c42933',
  },
  buttonTextStyle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
