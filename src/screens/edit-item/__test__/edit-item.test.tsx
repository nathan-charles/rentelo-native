import React from 'react';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';

import EditItem from '../';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer
    .create(
      <MockedProvider mocks={[]} addTypename={false}>
        <EditItem navigation={navigation} />
      </MockedProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
