import gql from 'graphql-tag';

export interface PayoutAccountInput {
  firstName: string;
  lastName: string;
  dob: string;
  ssn: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
}

export interface CreatePayoutAccountMutationData {
  data: {
    createPayoutAccount: {
      accountId: string;
      payoutsEnabled: boolean;
    };
  };
}

export interface CreatePayoutAccountMutationVariables {
  input: PayoutAccountInput;
}

const CREATE_PAYOUT_ACCOUNT_MUTATION = gql`
  mutation CreatePayoutAccountMutation($input: PayoutAccountInput) {
    createPayoutAccount(input: $input) {
      accountId
      payoutsEnabled
    }
  }
`;

export { CREATE_PAYOUT_ACCOUNT_MUTATION };
