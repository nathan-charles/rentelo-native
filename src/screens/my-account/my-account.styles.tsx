import { StyleSheet } from 'react-native';

import colors from '../../../src/config/colors';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  contentStyle: {
    flexGrow: 1,
  },
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
    marginTop: 0,
  },
  textNameStyle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  listItemStyle: {
    backgroundColor: '#FFF',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
});

export default styles;
