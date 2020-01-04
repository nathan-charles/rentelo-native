import React, { useEffect } from 'react';
import { AsyncStorage, StatusBar, SafeAreaView, View, Text } from 'react-native';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { Container, Button } from 'native-base';
import { useLazyQuery } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY, CurrentUserQueryData } from '../../shared/graphql/user/queries/current-user-query';
import styles from './landing.styles';

const Landing: NavigationStackScreenComponent<NavigationStackScreenProps> = ({ navigation }) => {
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

  useEffect(() => {
    if (loading === false && data) {
      console.log(data);
      data.viewer && navigation.navigate('TabNavigation');
    }
  }, [loading, data]);

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
      <Container style={containerStyle}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Text style={textAppNameStyle}>Rentelo</Text>
            <Text style={textPoweredByStyle}>Save and earn cash today!</Text>
          </View>
        </View>
        <View style={buttonGroupStyle}>
          <Button full style={buttonStyle} onPress={() => navigation.navigate('Login')}>
            <Text style={buttonTextStyle}>SIGN IN</Text>
          </Button>
          <View style={buttonDividerStyle} />
          <Button full style={buttonStyle} onPress={() => navigation.navigate('Register')}>
            <Text style={buttonTextStyle}>SIGN UP</Text>
          </Button>
          {/* <View style={buttonDividerStyle} />
          <Button full style={buttonStyle} onPress={() => navigation.navigate('Facebook')}>
            <Text style={buttonTextStyle}>FACEBOOK</Text>
          </Button> */}
        </View>
      </Container>
    </SafeAreaView>
  );
};

Landing.navigationOptions = () => {
  return {
    headerTitle: () => null,
  };
};

export default Landing;
