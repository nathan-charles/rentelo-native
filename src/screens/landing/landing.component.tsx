import React, { useEffect } from 'react';
import { AsyncStorage, StatusBar, SafeAreaView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useLazyQuery, useApolloClient } from '@apollo/client';

import Route from '@app-navigation/route';
import { LandingNavigationProp } from '@app-navigation/authentication.navigator';
import {
  IS_LOGGED_IN_QUERY,
  CURRENT_USER_QUERY,
  CurrentUserQueryData,
} from '@app-shared/graphql/user/queries/current-user-query';
import styles from './landing.styles';

type Props = {
  navigation: LandingNavigationProp;
};

const Landing: React.FC<Props> = ({ navigation }) => {
  const apolloClient = useApolloClient();

  // Fetch current user query hook
  const [executeCurrentUserQuery] = useLazyQuery<CurrentUserQueryData>(CURRENT_USER_QUERY);

  useEffect(() => {
    const fetchCurrentUserAsync = async () => {
      // await AsyncStorage.removeItem('token');
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log('Found Token', token);
        apolloClient.writeQuery({
          query: IS_LOGGED_IN_QUERY,
          data: { viewer: { isLoggedIn: true } },
        });
        executeCurrentUserQuery();
      } else {
        apolloClient.resetStore();
      }
    };

    fetchCurrentUserAsync();
  }, []);

  // Destructure styles
  const {
    safeAreaStyle,
    containerStyle,
    textAppNameStyle,
    textPoweredByStyle,
    buttonGroupStyle,
    buttonDividerStyle,
    buttonTextStyle,
    buttonStyle,
  } = styles;

  return (
    <SafeAreaView style={safeAreaStyle}>
      <View style={containerStyle}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={textAppNameStyle}>Rentelo</Text>
            <Text style={textPoweredByStyle}>Save and earn cash today!</Text>
          </View>
        </View>
        <View style={buttonGroupStyle}>
          <Button
            mode="contained"
            style={{ flex: 1, backgroundColor: '#c42933' }}
            contentStyle={buttonStyle}
            onPress={() => navigation.navigate(Route.LOGIN)}
          >
            <Text style={buttonTextStyle}>SIGN IN</Text>
          </Button>
          <View style={buttonDividerStyle} />
          <Button
            mode="contained"
            style={{ flex: 1, backgroundColor: '#c42933' }}
            contentStyle={buttonStyle}
            onPress={() => navigation.navigate(Route.LOGIN)}
          >
            <Text style={buttonTextStyle}>SIGN UP</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Landing.navigationOptions = () => {
//   return {
//     headerBackTitle: null,
//     headerTitle: () => null,
//   };
// };

export default Landing;
