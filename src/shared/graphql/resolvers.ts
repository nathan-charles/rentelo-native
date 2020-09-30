import { gql, ApolloCache, Resolvers } from '@apollo/client';

export const typeDefs = gql`
  extend type Viewer {
    isLoggedIn: Boolean!
  }
`;

type ResolverFn = (parent: any, args: any, { cache }: { cache: ApolloCache<any> }) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

// type AppResolvers = Resolvers;

interface AppResolvers extends Resolvers {
  Viewer: ResolverMap;
}

export const resolvers: AppResolvers = {
  Viewer: {
    isLoggedIn: false,
  },
};
