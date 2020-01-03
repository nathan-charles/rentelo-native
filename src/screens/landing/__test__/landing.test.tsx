import React from 'react';
import renderer from 'react-test-renderer';

import Landing from '../';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer.create(<Landing navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
