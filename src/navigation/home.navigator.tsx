import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import theme from '../config/theme';
import Route from './route';
import { MyAccount, SetupMerchantAccount } from '../screens';

import SearchNavigator from './search.navigator';
import MyAccountNavigator from './my-account.navigator';

type HomeNavigatorParams = {
  [Route.MY_ACCOUNT]: undefined;
  [Route.SETUP_MERCHANT]: undefined;
};

const Stack = createStackNavigator<HomeNavigatorParams>();
const Tab = createBottomTabNavigator();

const HomeNavigator: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      activeTintColor: theme.colors.primary,
      // inactiveTintColor: theme.colors,
      style: {
        borderTopWidth: 0,
      },
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName = 'rocket';
        if (route.name === Route.SEARCH) {
          iconName = 'rocket';
        }
        if (route.name === Route.MY_ACCOUNT) {
          iconName = 'user';
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name={Route.SEARCH} component={SearchNavigator} />
    <Tab.Screen name={Route.MY_ACCOUNT} component={MyAccountNavigator} />

    {/* <Tab.Screen name="Profile" component={Register} /> */}
  </Tab.Navigator>
);

export default HomeNavigator;

// export type MyAccountRouteProp = RouteProp<HomeNavigatorParams, Route.MY_ACCOUNT>;
// export type MyAccountNavigationProp = StackNavigationProp<HomeNavigatorParams, Route.MY_ACCOUNT>;

// export type SetupMerchantRouteProp = RouteProp<HomeNavigatorParams, Route.SETUP_MERCHANT>;
// export type SetupMerchantNavigationProp = StackNavigationProp<HomeNavigatorParams, Route.SETUP_MERCHANT>;
