import { AsyncStorage } from 'react-native';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { setContext } from '@apollo/link-context';
import { createUploadLink } from 'apollo-upload-client';

// import { typeDefs, resolvers } from './resolvers';
import { CURRENT_USER_QUERY, CURRENT_USER_IS_LOGGED_IN_QUERY } from './user/queries/current-user-query';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        viewer: {
          merge: true,
        },
      },
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');

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

const uploadLink = createUploadLink({
  uri: 'https://parseapi.back4app.com/graphql',
  headers: {
    'X-Parse-Application-Id': 'tfFOAtl6bvnf8pGohYVw0fH9yT0J3OpfCKad8NRp',
    'X-Parse-Client-Key': '3c8dJWJXe1Kb9TXLkMkkgzJ5bc3BiaLZGPL3QDTS',
  },
});

export const typeDefs = gql`
  extend type Viewer {
    isLoggedIn: Boolean!
  }
`;

const link = errorLink.concat(authLink).concat(uploadLink);

const client = new ApolloClient({ cache, link, typeDefs });

export default client;
