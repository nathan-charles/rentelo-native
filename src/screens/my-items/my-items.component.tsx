import React from 'react';
// import { Image } from 'react-native';
import { NavigationScreenComponent, NavigationScreenProps } from 'react-navigation';
import { Container, Content, Text, Body, Button, Icon, Left, List, ListItem, Right, View } from 'native-base';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { useQuery } from '@apollo/react-hooks';

import { HeaderButton } from '../../components';

// import { CURRENT_USER_QUERY, CurrentUserQueryData } from '../../shared/graphql/user/queries/current-user-query';
// import colors from '../../../src/config/colors';
// import images from 'src/config/images';
// import customMapStyle from 'src/config/google-map-style';
// import styles from './my-account.styles';

// interface MyAccountScreenProps extends NavigationScreenProps {
//   // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
// }

const MyItems: NavigationScreenComponent<NavigationScreenProps> = ({ navigation }) => {
  // Fetch current user query hook
  // const { data } = useQuery<CurrentUserQueryData>(CURRENT_USER_QUERY);

  // if (data == undefined) {
  //   return null;
  // }

  return (
    <Container>
      <Content>
        <Text>My Items</Text>
      </Content>
    </Container>
  );
};

MyItems.navigationOptions = ({ navigation }) => {
  return {
    title: 'My Items',
    headerRight: () => <HeaderButton dark text="ADD ITEM" onPress={() => navigation.navigate('EditItem')} />,
  };
};

export default MyItems;
