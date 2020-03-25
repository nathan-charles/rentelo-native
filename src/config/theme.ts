import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  // roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F63440',
    primaryDark: '#c42933', // Custom
    accent: '#FFF',
  },
  spacing: {
    gutter: 10,
    vertical: 10,
  },
};

export default theme;
