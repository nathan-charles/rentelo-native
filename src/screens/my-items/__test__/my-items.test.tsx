import React from 'react';
import renderer from 'react-test-renderer';

import MyItems from '../';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer.create(<MyItems navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
