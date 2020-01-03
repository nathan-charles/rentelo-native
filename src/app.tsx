import React from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { Root } from 'native-base';

import client from './shared/graphql/client';
import RenteloAppContainer from '../src/routes';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <Root>
      <StatusBar barStyle="light-content" />
      <RenteloAppContainer />
    </Root>
  </ApolloProvider>
);

export default App;
