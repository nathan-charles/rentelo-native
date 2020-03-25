import React from 'react';
import { View, Button, Text } from 'native-base';

import styles from './header-button.styles';

interface HeaderButtonProps {
  dark?: boolean;
  disabled?: boolean;
  onPress?(): void;
  text: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ dark, disabled, onPress, text }) => {
  return (
    <View style={styles.containerStyle}>
      <Button small disabled={disabled} style={dark ? styles.buttonDarkStyle : styles.buttonStyle} onPress={onPress}>
        <Text style={dark ? styles.textDarkStyle : styles.textStyle}>{text}</Text>
      </Button>
    </View>
  );
};

export default HeaderButton;
