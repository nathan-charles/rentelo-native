import { StyleSheet } from 'react-native';

import theme from '../../config/theme';

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: theme.spacing.gutter,
  },
  buttonStyle: {
    backgroundColor: '#FFF',
  },
  buttonDarkStyle: {
    backgroundColor: theme.colors.primaryDark,
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
