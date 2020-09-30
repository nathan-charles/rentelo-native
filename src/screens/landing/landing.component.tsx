import React, { useEffect } from 'react';
import { AsyncStorage, StatusBar, SafeAreaView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useLazyQuery } from '@apollo/client';

import Route from '@app-navigation/route';
import { LandingNavigationProp } from '@app-navigation/authentication.navigator';
import { CURRENT_USER_QUERY, CurrentUserQueryData } from '@app-shared/graphql/user/queries/current-user-query';
import styles from './landing.styles';

type Props = {
  navigation: LandingNavigationProp;
};

const Landing: React.FC<Props> = ({ navigation }) => {
  // Fetch current user query hook
  const [executeCurrentUserQuery, { loading, data }] = useLazyQuery<CurrentUserQueryData>(CURRENT_USER_QUERY, {
    // fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const fetchCurrentUserAsync = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        executeCurrentUserQuery();
      }
    };

    fetchCurrentUserAsync();
  }, []);

  // useEffect(() => {
  //   if (loading === false && data) {
  //     console.log(data);
  //     data.viewer && navigation.navigate('TabNavigation');
  //   }
  // }, [loading, data]);

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
