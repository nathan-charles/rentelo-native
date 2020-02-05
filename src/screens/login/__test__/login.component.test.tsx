import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import { MockedProvider, wait } from '@apollo/react-testing';

import Login from '../';
import { LOGIN_MUTATION } from '../../../shared/graphql/user/mutations/login-mutation';

const username = 'nathan.charles@me.com';
const password = 'password';
let logInMutationCalled = false;

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        username,
        password,
      },
    },
    result: () => {
      logInMutationCalled = true;

      return {
        data: {
          logIn: { sessionToken: '123' },
        },
      };
    },
  },
];

describe('<Login />', () => {
  test('renders correctly', async () => {
    const props: any = {
      navigation: { navigate: jest.fn() },
    };

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login {...props} />
      </MockedProvider>
    );

    await wait(1);

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('login mutation', async () => {
    const props: any = {
      navigation: { navigate: jest.fn() },
    };

    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login {...props} />
      </MockedProvider>
    );

    const { getByTestId } = component;

    fireEvent(getByTestId('input-email'), 'onChangeText', username);
    fireEvent(getByTestId('input-password'), 'onChangeText', password);
    fireEvent.press(getByTestId('button-login'));

    await wait(1);

    expect(logInMutationCalled).toBe(true);

    // const tree = component.toJSON();
    // expect(tree.children).toContain('Error!');
  });
});
