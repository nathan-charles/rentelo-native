import React from 'react';
import { StatusBar } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { Provider as PaperProvider } from 'react-native-paper';

import client from '@app-shared/graphql/client';
import theme from '@app-config/theme';
import { AppNavigator } from './navigation';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <AppNavigator />
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
