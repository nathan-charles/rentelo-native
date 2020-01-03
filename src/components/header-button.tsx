import React from 'react';
import { StyleSheet } from 'react-native';
import { connectStyle, View, Button, Text } from 'native-base';

import colors from '../../src/config/colors';

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

interface HeaderButtonProps {
  dark?: boolean;
  style: any;
  disabled?: boolean;
  onPress?(): void;
  text: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ dark, style, disabled, onPress, text }) => {
  return (
    <View padder>
      <Button small disabled={disabled} style={dark ? styles.buttonDarkStyle : styles.buttonStyle} onPress={onPress}>
        <Text style={dark ? styles.textDarkStyle : styles.textStyle}>{text}</Text>
      </Button>
    </View>
  );
};

// const defaultStyles = {
//   buttonStyle: {
//     backgroundColor: '#FFF',
//   },
//   buttonDarkStyle: {
//     backgroundColor: colors.primaryColor2,
//   },
//   textStyle: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   textDarkStyle: {
//     fontWeight: 'bold',
//   },
// };

// export default connectStyle('rentelo.HeaderButton', defaultStyles)(HeaderButton);

export default HeaderButton;
