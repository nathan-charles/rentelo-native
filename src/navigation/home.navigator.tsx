import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Route from './route';
import { MyAccount, SetupMerchantAccount } from '../screens';

type HomeNavigatorParams = {
  [Route.MY_ACCOUNT]: undefined;
  [Route.SETUP_MERCHANT]: undefined;
};

const Stack = createStackNavigator<HomeNavigatorParams>();

const HomeNavigator: React.FC = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Route.MY_ACCOUNT} component={MyAccount} />
    <Stack.Screen name={Route.SETUP_MERCHANT} component={SetupMerchantAccount} />
  </Stack.Navigator>
);

export default HomeNavigator;

export type MyAccountRouteProp = RouteProp<HomeNavigatorParams, Route.MY_ACCOUNT>;
export type MyAccountNavigationProp = StackNavigationProp<HomeNavigatorParams, Route.MY_ACCOUNT>;

export type SetupMerchantRouteProp = RouteProp<HomeNavigatorParams, Route.SETUP_MERCHANT>;
export type SetupMerchantNavigationProp = StackNavigationProp<HomeNavigatorParams, Route.SETUP_MERCHANT>;
