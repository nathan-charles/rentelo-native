import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Route from './route';
import { Landing, Login } from '../screens';

type AuthenticationNavigatorParams = {
  [Route.LANDING]: undefined;
  [Route.LOGIN]: undefined;
};

const Stack = createStackNavigator<AuthenticationNavigatorParams>();

const AuthenticationNavigator: React.FC = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={Route.LANDING} component={Landing} />
    <Stack.Screen name={Route.LOGIN} component={Login} />
  </Stack.Navigator>
);

export default AuthenticationNavigator;

export type LandingRouteProp = RouteProp<AuthenticationNavigatorParams, Route.LANDING>;
export type LandingNavigationProp = StackNavigationProp<AuthenticationNavigatorParams, Route.LANDING>;

export type LoginRouteProp = RouteProp<AuthenticationNavigatorParams, Route.LOGIN>;
export type LoginNavigationProp = StackNavigationProp<AuthenticationNavigatorParams, Route.LOGIN>;
