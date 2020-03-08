import { StyleSheet } from 'react-native';

import theme from './../../config/theme';

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: '#c42933',
  },
  containerStyle: {
    flex: 1,
    backgroundColor: theme.colors.primary,
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
    padding: 8,
    flexDirection: 'row',
  },
  buttonDividerStyle: {
    width: 8,
  },
  buttonStyle: {
    // flex: 1,
    height: 60,
  },
  buttonTextStyle: {
    color: '#FFF',
    // fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default styles;
