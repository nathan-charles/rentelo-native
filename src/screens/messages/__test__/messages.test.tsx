import React from 'react';
import renderer from 'react-test-renderer';

import Messages from '../';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer.create(<Messages navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
