import React from 'react';
import renderer from 'react-test-renderer';

import MyAccount from '../';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer.create(<MyAccount navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
