import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uploadLink = createUploadLink({
  uri: 'https://parseapi.back4app.com/graphql',
  headers: {
    'X-Parse-Application-Id': 'tfFOAtl6bvnf8pGohYVw0fH9yT0J3OpfCKad8NRp',
    'X-Parse-Client-Key': '3c8dJWJXe1Kb9TXLkMkkgzJ5bc3BiaLZGPL3QDTS',
  },
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token');
  // return the headers to the context so httpLink can read them

  if (token) {
    return {
      headers: {
        ...headers,
        'X-Parse-Session-Token': token,
      },
    };
  }

  return {
    headers: {
      ...headers,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;
