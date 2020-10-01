import gql from 'graphql-tag';

export interface ExternalAccount {
  accountId: string;
  status: string;
  bankName: string;
  bankLast4: string;
}

export interface CurrentUserQueryData {
  viewer: {
    isLoggedIn: boolean;
    user?: {
      id: string;
      username: string;
      payoutAccount: {
        externalAccounts: [ExternalAccount];
        payoutsEnabled: boolean;
        accountId: string;
      };
      profile: {
        firstName: string;
        lastName: string;
        city: string;
        state: string;
      };
    };
  };
}

export const IS_LOGGED_IN_QUERY = gql`
  query IsLoggedInQuery {
    viewer {
      isLoggedIn @client
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    viewer {
      user {
        id
        username
        payoutAccount {
          # externalAccounts
          payoutsEnabled
          accountId
        }
        profile {
          firstName
          lastName
          city
          state
        }
      }
    }
  }
`;
