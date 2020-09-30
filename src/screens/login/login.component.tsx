import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, Text, TextInput, Snackbar } from 'react-native-paper';
import { useMutation } from '@apollo/client';

import { LoginNavigationProp } from '../../navigation';
import {
  LOGIN_MUTATION,
  LoginMutationData,
  LoginMutationVariables,
} from '../../shared/graphql/user/mutations/login-mutation';
import {
  CURRENT_USER_IS_LOGGED_IN_QUERY,
  CurrentUserQueryData,
} from '../../shared/graphql/user/queries/current-user-query';

import theme from './../../config/theme';
import styles from './login.styles';

interface Props {
  navigation: LoginNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  // State
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [username, setUsername] = React.useState<string>('nathan.charles@me.com');
  const [password, setPassword] = React.useState<string>('Addy7211');

  // Login Mutation Hook
  const [logInMutation, { loading }] = useMutation<LoginMutationData, LoginMutationVariables>(LOGIN_MUTATION, {
    update: (cache, { data }) => {
      cache.writeQuery<CurrentUserQueryData>({
        query: CURRENT_USER_IS_LOGGED_IN_QUERY,
        data: { viewer: { isLoggedIn: true } },
      });
    },
    onCompleted: async (data) => {
      const {
        logIn: {
          viewer: { sessionToken },
        },
      } = data;

      console.log(sessionToken);

      // Set session token in AsyncStorage
      await AsyncStorage.setItem('token', sessionToken);
    },
    onError: (error) => {
      console.log(error);
      // setError(error.graphQLErrors[0].message);
    },
  });

  const handleLogin = async () => {
    Keyboard.dismiss();

    logInMutation({
      variables: {
        username: username.toLowerCase().trim(),
        password,
      },
    });
  };

  // Destructure styles
  const {
    safeAreaStyle,
    containerStyle,
    contentStyle,
    textAppNameStyle,
    textPoweredByStyle,
    inputContainerStyle,
    buttonTextStyle,
    buttonContentStyle,
    buttonForgotPasswordStyle,
    buttonForgotPasswordTextStyle,
  } = styles;

  return (
    <SafeAreaView style={safeAreaStyle}>
      <KeyboardAvoidingView style={containerStyle} behavior="padding">
        <ScrollView
          contentContainerStyle={contentStyle}
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={false}
        >
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 40 }}>
            <View>
              <Text style={textAppNameStyle}>Rentelo</Text>
              <Text style={textPoweredByStyle}>Save and earn cash today!</Text>
            </View>
          </View>
          <View style={inputContainerStyle}>
            <TextInput
              testID="input-email"
              mode="outlined"
              selectionColor="#F63440"
              label="Email Address"
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
            <TextInput
              testID="input-password"
              mode="outlined"
              selectionColor="#F63440"
              label="Password"
              secureTextEntry
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
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} size="large" />
          ) : (
            <Button testID="button-login" contentStyle={buttonContentStyle} mode="contained" onPress={handleLogin}>
              <Text style={buttonTextStyle}>LOG IN</Text>
            </Button>
          )}
        </ScrollView>
        <Snackbar
          visible={error !== undefined}
          onDismiss={() => setError(undefined)}
          action={{
            label: 'Dismiss',
            onPress: () => {
              setError(undefined);
            },
          }}
        >
          {error}
        </Snackbar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

Login.navigationOptions = () => {
  return {
    headerBackTitle: null,
    headerTitle: () => null,
  };
};

export default Login;
