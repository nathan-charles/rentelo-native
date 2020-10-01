import React from 'react';
import { View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Route from './route';
import { MyAccount, SetupMerchantAccount } from '../screens';
import theme from '../config/theme';

type SearchNavigatorParams = {
  [Route.SEARCH]: undefined;
};

const Stack = createStackNavigator<SearchNavigatorParams>();

const HomeNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: '#FFF',
      cardStyle: {
        backgroundColor: theme.colors.background,
      },
    }}
  >
    <Stack.Screen name={Route.SEARCH} component={View} />
  </Stack.Navigator>
);

export default HomeNavigator;

// export type MyAccountRouteProp = RouteProp<SearchNavigatorParams, Route.MY_ACCOUNT>;
// export type MyAccountNavigationProp = StackNavigationProp<SearchNavigatorParams, Route.MY_ACCOUNT>;

// export type SetupMerchantRouteProp = RouteProp<SearchNavigatorParams, Route.SETUP_MERCHANT>;
// export type SetupMerchantNavigationProp = StackNavigationProp<SearchNavigatorParams, Route.SETUP_MERCHANT>;
