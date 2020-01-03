import { StyleSheet } from 'react-native';

import colors from '../../../src/config/colors';

const styles = StyleSheet.create({
  imageProfilePhoto: {
    width: 100,
    height: 100,
    marginTop: -50,
    marginLeft: 15,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.primaryColor,
  },
  buttonEditProfileStyle: {
    alignSelf: 'flex-end',
    marginTop: -30,
    marginRight: 15,
  },
  textNameStyle: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
