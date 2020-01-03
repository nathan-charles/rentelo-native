import gql from 'graphql-tag';

export interface LoginMutationData {
  logIn: {
    sessionToken: string;
  };
}

export interface LoginMutationVariables {
  username: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    logIn(fields: { username: $username, password: $password }) {
      sessionToken
    }
  }
`;

export { LOGIN_MUTATION };
