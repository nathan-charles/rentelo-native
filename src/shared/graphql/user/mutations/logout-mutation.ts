import gql from 'graphql-tag';

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logOut {
      # id
      # updatedAt
      # createdAt
      # username
      sessionToken
      # ACL
    }
  }
`;

export { LOGOUT_MUTATION };
