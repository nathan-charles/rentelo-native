import React from 'react';
import { AsyncStorage, Keyboard, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { Container, Content, Input, Button, Icon, Toast } from 'native-base';
import { useMutation } from '@apollo/react-hooks';

import {
  LOGIN_MUTATION,
  LoginMutationData,
  LoginMutationVariables,
} from '../../shared/graphql/user/mutations/login-mutation';
import styles from './login.styles';

const Login: NavigationStackScreenComponent<NavigationStackScreenProps> = ({ navigation }) => {
  // State
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  // Login Mutation Hook
  const [logInMutation] = useMutation<LoginMutationData, LoginMutationVariables>(LOGIN_MUTATION, {
    variables: { username: username.toLowerCase().trim(), password },
    // fetchPolicy: 'cache-and-network',
  });

  const handleLogin = async () => {
    // Dismiss Keyboard
    Keyboard.dismiss();

    try {
      // Call LogIn Mutation
      const result = await logInMutation();

      if (result) {
        const { data } = result;
        if (data) {
          console.log('Data', data);
          const {
            logIn: { sessionToken },
          } = data;

          console.log(sessionToken);

          // Set session token in AsyncStorage
          await AsyncStorage.setItem('token', sessionToken);

          // Navigate to App
          navigation.navigate('TabNavigation');
        }
      }
    } catch (error) {
      console.log(error);

      Toast.show({ text: error.graphQLErrors[0].message, buttonText: 'Ok', position: 'bottom' });
    }
  };

  // Destructure styles
  const {
    safeAreaStyle,
    containerStyle,
    contentStyle,
    textAppNameStyle,
    textPoweredByStyle,
    inputContainerStyle,
    inputIconStyle,
    inputStyle,
    buttonTextStyle,
    buttonStyle,
    buttonForgotPasswordStyle,
    buttonForgotPasswordTextStyle,
  } = styles;

  return (
    <SafeAreaView style={safeAreaStyle}>
      <Container style={containerStyle}>
        <Content contentContainerStyle={contentStyle}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            <View>
              <Text style={textAppNameStyle}>Rentelo</Text>
              <Text style={textPoweredByStyle}>Save and earn cash today!</Text>
            </View>
          </View>
          <View style={inputContainerStyle}>
            <Icon type="MaterialIcons" name="mail" style={inputIconStyle} />
            <Input
              selectionColor="#FFF"
              placeholder="Email Address"
              style={inputStyle}
              placeholderTextColor="#F6868D"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              keyboardAppearance="dark"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={inputContainerStyle}>
            <Icon type="MaterialIcons" name="lock" style={inputIconStyle} />
            <Input
              selectionColor="#FFF"
              placeholder="Password"
              secureTextEntry
              style={inputStyle}
              placeholderTextColor="#F6868D"
              autoCorrect={false}
              keyboardAppearance="dark"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={buttonForgotPasswordStyle}>
            <Text style={buttonForgotPasswordTextStyle}>Forgot Password?</Text>
          </TouchableOpacity>
          <Button block style={buttonStyle} onPress={handleLogin}>
            <Text style={buttonTextStyle}>LOG IN</Text>
          </Button>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

Login.navigationOptions = () => {
  return {
    headerTitle: () => null,
  };
};

export default Login;
