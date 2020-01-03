import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Icon } from 'native-base';

import Landing from './screens/landing';
import Login from './screens/login';
import Messages from './screens/messages';
import MyItems from './screens/my-items';
import EditItem from './screens/edit-item';
import MyAccount from './screens/my-account';
import SetupMerchantAccount from './screens/setup-merchant-account';

const sharedNavigationOptions = {
  headerStyle: {
    backgroundColor: '#F63440',
    borderBottomWidth: 0,
  },
  headerTintColor: '#FFF',
};

export const LoginRegistrationStack = createStackNavigator(
  {
    Landing: {
      screen: Landing,
    },
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'Landing',
    defaultNavigationOptions: {
      headerTransparent: true,
      headerTintColor: '#FFF',
    },
  }
);

// export const HomeStack = createStackNavigator(
//   {
//     Home: {
//       screen: Home,
//     },
//     IItem: {
//       screen: ItemDetail,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       ...sharedNavigationOptions,
//     },
//   }
// );

// export const BookingStack = createStackNavigator(
//   {
//     Bookings: {
//       screen: Bookings,
//     },
//   },
//   {
//     defaultNavigationOptions: {
//       ...sharedNavigationOptions,
//     },
//   }
// );

export const MessagesStack = createStackNavigator(
  {
    Messages: {
      screen: Messages,
    },
  },
  {
    defaultNavigationOptions: {
      ...sharedNavigationOptions,
    },
  }
);

export const MyItemsStack = createStackNavigator(
  {
    MyItems: {
      screen: MyItems,
    },
  },
  {
    defaultNavigationOptions: {
      ...sharedNavigationOptions,
    },
  }
);

export const EditItemStack = createStackNavigator(
  {
    EditItem: {
      screen: EditItem,
    },
  },
  {
    defaultNavigationOptions: {
      ...sharedNavigationOptions,
    },
  }
);

export const MyAccountStack = createStackNavigator(
  {
    MyAccount: {
      screen: MyAccount,
    },
  },
  {
    defaultNavigationOptions: {
      ...sharedNavigationOptions,
    },
  }
);

export const SetupMerchantAccountStack = createStackNavigator(
  {
    SetupMerchantAccount: {
      screen: SetupMerchantAccount,
    },
  },
  {
    defaultNavigationOptions: {
      ...sharedNavigationOptions,
    },
  }
);

interface TabIconProps {
  tintColor: string;
}

export const TabNavigation = createBottomTabNavigator(
  {
    // Search: {
    //   screen: SearchStack,
    //   navigationOptions: {
    //     tabBarLabel: 'Search',
    //     tabBarIcon: props => <TabIcon type="MaterialCommunityIcons" name="cart" {...props} />,
    //   },
    // },
    // // Bookings: {
    // //   screen: SearchStack,
    // //   navigationOptions: {
    // //     tabBarLabel: 'Bookings',
    // //     tabBarIcon: props => <TabIcon type="MaterialIcons" name="date-range" {...props} />,
    // //   },
    // // },
    Conversations: {
      screen: MessagesStack,
      navigationOptions: {
        tabBarLabel: 'Messages',
        tabBarIcon: ({ tintColor }: TabIconProps) => (
          <Icon type="MaterialIcons" name="chat" style={{ color: tintColor }} />
        ),
      },
    },
    MyItems: {
      screen: MyItemsStack,
      navigationOptions: {
        tabBarLabel: 'My Items',
        tabBarIcon: ({ tintColor }: TabIconProps) => (
          <Icon type="MaterialIcons" name="view-list" style={{ color: tintColor }} />
        ),
      },
    },
    MyAccount: {
      screen: MyAccountStack,
      navigationOptions: {
        tabBarLabel: 'My Account',
        tabBarIcon: ({ tintColor }: TabIconProps) => (
          <Icon type="MaterialIcons" name="account-box" style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#F63440',
      style: {
        borderTopWidth: 0,
      },
    },
  }
);

export const AppStack = createStackNavigator(
  {
    TabNavigation: {
      screen: TabNavigation,
    },
    // Messages: {
    //   screen: MessagesStack,
    // },
    EditItem: {
      screen: EditItemStack,
    },
    SetupMerchantAccount: {
      screen: SetupMerchantAccountStack,
    },
    // EditProfile: {
    //   screen: EditProfileStack,
    // },
  },
  {
    initialRouteName: 'TabNavigation',
    // mode: 'modal',
    headerMode: 'none',
  }
);

export const Root = createSwitchNavigator({
  LoginRegistration: {
    screen: LoginRegistrationStack,
  },
  App: {
    screen: AppStack,
  },
});

const RenteloAppContainer = createAppContainer(Root);

export default RenteloAppContainer;
