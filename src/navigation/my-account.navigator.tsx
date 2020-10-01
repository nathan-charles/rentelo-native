import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Route from './route';
import { MyAccount, SetupMerchantAccount } from '../screens';
import theme from '../config/theme';

type MyAccountNavigatorParams = {
  [Route.MY_ACCOUNT]: undefined;
  [Route.SETUP_MERCHANT]: undefined;
};

const Stack = createStackNavigator<MyAccountNavigatorParams>();

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
    <Stack.Screen name={Route.MY_ACCOUNT} component={MyAccount} />
    <Stack.Screen name={Route.SETUP_MERCHANT} component={SetupMerchantAccount} />
  </Stack.Navigator>
);

export default HomeNavigator;

export type MyAccountRouteProp = RouteProp<MyAccountNavigatorParams, Route.MY_ACCOUNT>;
export type MyAccountNavigationProp = StackNavigationProp<MyAccountNavigatorParams, Route.MY_ACCOUNT>;

export type SetupMerchantRouteProp = RouteProp<MyAccountNavigatorParams, Route.SETUP_MERCHANT>;
export type SetupMerchantNavigationProp = StackNavigationProp<MyAccountNavigatorParams, Route.SETUP_MERCHANT>;
