import React from 'react';
// import { Image } from 'react-native';
import { NavigationScreenComponent, NavigationScreenProps } from 'react-navigation';
import { Container, Content, Text } from 'native-base';

const Messages: NavigationScreenComponent<NavigationScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <Content>
        <Text>Messages</Text>
      </Content>
    </Container>
  );
};

Messages.navigationOptions = {
  title: 'Messages',
};

export default Messages;
