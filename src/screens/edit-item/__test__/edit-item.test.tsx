import React from 'react';
import renderer from 'react-test-renderer';

import EditItem from '../';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer.create(<EditItem navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
