import { StyleSheet } from 'react-native';

import theme from '../../config/theme';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  contentStyle: {
    // flexGrow: 1,
  },
  formStyle: {
    paddingHorizontal: theme.spacing.gutter,
    paddingVertical: theme.spacing.vertical,
    backgroundColor: '#FFF',
  },
  fieldStyle: {
    marginVertical: theme.spacing.vertical,
  },
});

export default styles;
