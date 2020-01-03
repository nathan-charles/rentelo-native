import React from 'react';
import renderer from 'react-test-renderer';

import SetupMerchantAccount from '../';

test('renders correctly', () => {
  const navigation = { navigate: jest.fn() };
  const tree = renderer.create(<SetupMerchantAccount navigation={navigation} />).toJSON();
  expect(tree).toMatchSnapshot();
});
