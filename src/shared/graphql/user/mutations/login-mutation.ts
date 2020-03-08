import gql from 'graphql-tag';

export interface LoginMutationData {
  logIn: {
    viewer: {
      sessionToken: string;
    };
  };
}

export interface LoginMutationVariables {
  username: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    logIn(input: { username: $username, password: $password }) {
      viewer {
        sessionToken
      }
    }
  }
`;

export { LOGIN_MUTATION };
