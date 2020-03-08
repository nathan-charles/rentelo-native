import gql from 'graphql-tag';

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logOut(input: { clientMutationId: null }) {
      viewer {
        # id
        # updatedAt
        # createdAt
        # username
        sessionToken
        # ACL
      }
    }
  }
`;

export { LOGOUT_MUTATION };
