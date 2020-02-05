import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';

import Landing from '../';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
        <Landing navigation={navigation} />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
