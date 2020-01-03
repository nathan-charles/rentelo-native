import React from 'react';
import { Image } from 'react-native';
import { NavigationScreenComponent, NavigationScreenProps } from 'react-navigation';
import { Container, Content, Text, Body, Button, Icon, Left, List, ListItem, Right, View } from 'native-base';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useQuery } from '@apollo/react-hooks';

import { CURRENT_USER_QUERY, CurrentUserQueryData } from '../../shared/graphql/user/queries/current-user-query';
import colors from '../../../src/config/colors';
// import images from 'src/config/images';
// import customMapStyle from 'src/config/google-map-style';
import styles from './my-account.styles';

// interface MyAccountScreenProps extends NavigationScreenProps {
//   // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
// }

const MyAccount: NavigationScreenComponent<NavigationScreenProps> = ({ navigation }) => {
  // Fetch current user query hook
  const { data } = useQuery<CurrentUserQueryData>(CURRENT_USER_QUERY);

  if (data == undefined) {
    return null;
  }

  // Destructure styles
  const { buttonEditProfileStyle, textNameStyle } = styles;

  // Get current user
  const { viewer } = data;

  // Get payout account
  const { payoutAccount, profile } = viewer;

  // Get profile
  const { firstName, lastName, city, state } = profile;

  return (
    <Container>
      <Content>
        <View style={{ backgroundColor: '#FFFFFF' }}>
          {/* {this.renderPhoto()} */}
          <Button small style={buttonEditProfileStyle} onPress={() => navigation.navigate('EditProfile')}>
            <Text>EDIT PROFILE</Text>
          </Button>
          <Text style={textNameStyle}>{`${firstName} ${lastName}`}</Text>
        </View>
        <List style={{ backgroundColor: '#FFF' }}>
          <ListItem last>
            <View>
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
          </ListItem>
          <ListItem itemDivider>
            <Text>PAYMENTS & PAYOUTS</Text>
          </ListItem>
          <ListItem first icon>
            <Left>
              <Icon name="md-card" type="Ionicons" />
            </Left>
            <Body>
              <Text>Payments</Text>
              <Text note>Please add a Credit or Debit Card</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          {payoutAccount ? (
            <ListItem icon onPress={() => navigation.navigate('SetupMerchantAccount')}>
              <Left>
                <Icon name="md-card" />
              </Left>
              <Body>
                <Text>Payouts</Text>
                <Text note>Update Banking</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          ) : (
            <ListItem icon onPress={() => navigation.navigate('SetupMerchantAccount')}>
              <Left>
                <Icon name="md-card" />
              </Left>
              <Body>
                <Text>Payouts</Text>
                <Text note>Setup Merchant Account</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          )}
          <ListItem last icon>
            <Left>
              <Icon name="md-calendar" />
            </Left>
            <Body>
              <Text>Transaction History</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Text>SETTINGS</Text>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="md-mail" />
            </Left>
            <Body>
              <Text>Change Email</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="md-unlock" />
            </Left>
            <Body>
              <Text>Change Password</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="md-paper" />
            </Left>
            <Body>
              <Text>Terms & Conditions</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Icon name="md-paper" />
            </Left>
            <Body>
              <Text>Privacy Policy</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem last icon>
            <Left>
              <Icon name="md-power" />
            </Left>
            <Body>
              <Text>Log Out</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider>
            <Text>Rentelo v1.0.0 (1)</Text>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

MyAccount.navigationOptions = {
  title: 'My Account',
};

export default MyAccount;
