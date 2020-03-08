import React from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider as PaperProvider } from 'react-native-paper';
import { Root } from 'native-base';

import client from './shared/graphql/client';
import RenteloAppContainer from '../src/routes';

import theme from './config/theme';

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <PaperProvider theme={theme}>
      <Root>
        <StatusBar barStyle="light-content" />
        <RenteloAppContainer />
      </Root>
    </PaperProvider>
  </ApolloProvider>
);

export default App;
