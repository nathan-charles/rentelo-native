import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useQuery } from '@apollo/client';

import {
  CURRENT_USER_IS_LOGGED_IN_QUERY,
  CurrentUserQueryData,
} from '../shared/graphql/user/queries/current-user-query';

// import Route from './route';
import AuthenticationNavigator from './authentication.navigator';
import HomeNavigator from './home.navigator';

type AppNavigatorParams = {
  // [Route.LANDING]: undefined;
  // [Route.HOME]: undefined;
};

const Stack = createStackNavigator<AppNavigatorParams>();

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

const AppNavigator: React.FC<Partial<StackNavigatorProps>> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch current user query hook
  const { data: currentUserData } = useQuery<CurrentUserQueryData>(CURRENT_USER_IS_LOGGED_IN_QUERY);

  useEffect(() => {
    console.log('currentUserData', currentUserData);
    if (currentUserData && currentUserData.viewer.isLoggedIn) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [currentUserData]);

  return <NavigationContainer>{isAuthenticated ? <HomeNavigator /> : <AuthenticationNavigator />}</NavigationContainer>;
};

export default AppNavigator;
