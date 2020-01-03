import { StyleSheet } from 'react-native';

import colors from '../../../src/config/colors';

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FFF',
  },
  buttonDarkStyle: {
    backgroundColor: colors.primaryColor2,
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  textDarkStyle: {
    fontWeight: 'bold',
  },
});

export default styles;
