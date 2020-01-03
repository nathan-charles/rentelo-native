import gql from 'graphql-tag';

export interface ExternalAccount {
  accountId: string;
  status: string;
  bankName: string;
  bankLast4: string;
}

export interface CurrentUserQueryData {
  viewer: {
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
}

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    viewer {
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
`;

export { CURRENT_USER_QUERY };
