import React from 'react';
import { AsyncStorage, ScrollView, View } from 'react-native';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { Button, Divider, List, Text } from 'react-native-paper';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY, CurrentUserQueryData } from '../../shared/graphql/user/queries/current-user-query';
import { LOGOUT_MUTATION } from '../../shared/graphql/user/mutations/logout-mutation';

import colors from '../../../src/config/colors';
import theme from '../../config/theme';
// import images from 'src/config/images';
// import customMapStyle from 'src/config/google-map-style';
import styles from './my-account.styles';

// interface MyAccountScreenProps extends NavigationScreenProps {
//   // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
// }

const MyAccount: NavigationStackScreenComponent<NavigationStackScreenProps> = ({ navigation }) => {
  // Fetch current user query hook
  const { data: currentUserData } = useQuery<CurrentUserQueryData>(CURRENT_USER_QUERY);

  // Logout Mutation Hook
  const [logOutMutation] = useMutation(LOGOUT_MUTATION, {
    onCompleted: async () => {
      // Remove session token in AsyncStorage
      await AsyncStorage.removeItem('token');

      // Navigate to Login / Landing
      navigation.navigate('LoginRegistration');
    },
  });

  const handleLogout = async () => {
    try {
      // Call LogOut Mutation
      logOutMutation();
    } catch (error) {
      console.log(error);

      // Toast.show({ text: error.graphQLErrors[0].message, buttonText: 'Ok', position: 'bottom' });
    }
  };

  if (currentUserData == undefined) {
    return null;
  }

  // Destructure styles
  const { containerStyle, contentStyle, buttonEditProfileStyle, textNameStyle, listItemStyle } = styles;

  // Get current user
  const { viewer } = currentUserData;

  // Get payout account
  const { payoutAccount, profile } = viewer.user;

  // Get profile
  const { firstName, lastName, city, state } = profile;

  return (
    <View style={containerStyle}>
      <ScrollView contentContainerStyle={contentStyle}>
        <View style={{ padding: 15, backgroundColor: '#FFF' }}>
          {/* {this.renderPhoto()} */}
          <Button mode="outlined" style={buttonEditProfileStyle} onPress={() => navigation.navigate('EditProfile')}>
            <Text>EDIT PROFILE</Text>
          </Button>
          <Text style={textNameStyle}>{`${firstName} ${lastName}`}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 17, color: colors.secondaryTextColor }}>Location:</Text>
            <Text style={{ marginLeft: 10, fontSize: 17, color: colors.primaryColor }}>
              {city && state ? `${city}, ${state}` : 'Not Set'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 17, color: colors.secondaryTextColor }}>Member Since:</Text>
            <Text style={{ marginLeft: 10, fontSize: 17 }}>Dec, 2017</Text>
          </View>
        </View>
        <View></View>

        {/* Payments & Payouts */}
        <List.Section>
          <List.Subheader>PAYMENTS & PAYOUTS</List.Subheader>
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Payments"
            description="Please add a Credit or Debit Card"
            left={() => <List.Icon color={theme.colors.primary} icon="credit-card" />}
            right={() => <List.Icon color={theme.colors.primary} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Payouts"
            description="Setup Merchant Account"
            onPress={() => navigation.navigate('SetupMerchantAccount')}
            left={() => <List.Icon color={theme.colors.primary} icon="credit-card" />}
            right={() => <List.Icon color={theme.colors.primary} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Transaction History"
            onPress={() => navigation.navigate('SetupMerchantAccount')}
            left={() => <List.Icon color={theme.colors.primary} icon="calendar-outline" />}
            right={() => <List.Icon color={theme.colors.primary} icon="chevron-right" />}
          />
        </List.Section>

        {/* Settings */}
        <List.Section>
          <List.Subheader>SETTINGS</List.Subheader>
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Change Email"
            left={() => <List.Icon color={theme.colors.primary} icon="lock-open-outline" />}
            right={() => <List.Icon color={theme.colors.primary} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Change Password"
            left={() => <List.Icon color={theme.colors.primary} icon="lock-open-outline" />}
            right={() => <List.Icon color={theme.colors.primary} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Log Out"
            onPress={handleLogout}
            left={() => <List.Icon color={theme.colors.primary} icon="power" />}
          />
        </List.Section>

        {/* Information */}
        <List.Section>
          <List.Subheader>INFORMATION</List.Subheader>
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Terms & Conditions"
            left={() => <List.Icon color={theme.colors.primary} icon="file-document-outline" />}
            right={() => <List.Icon color={theme.colors.primary} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Privacy Policy"
            left={() => <List.Icon color={theme.colors.primary} icon="file-document-outline" />}
            right={() => <List.Icon color={theme.colors.primary} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={listItemStyle}
            title="Version"
            description="Rentelo v1.0.0 (1)"
            left={() => <List.Icon color={theme.colors.primary} icon="information-outline" />}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};

MyAccount.navigationOptions = {
  title: 'My Account',
};

export default MyAccount;
