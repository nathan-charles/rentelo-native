import gql from 'graphql-tag';

export interface Owner {
  __type: string;
  className: string;
  id: string;
}

export interface CreateItemMutationData {
  data: {
    objects: {
      createItem: {
        id: string;
      };
    };
  };
}

export interface CreateItemMutationVariables {
  fields: {
    name: string;
    description: string;
    owner: Owner;
    pricePerHour?: number;
    pricePerDay?: number;
  };
}

const CREATE_ITEM_MUTATION = gql`
  mutation CreateItemMutation($fields: ItemCreateFields) {
    objects {
      createItem(fields: $fields) {
        id
      }
    }
  }
`;

export { CREATE_ITEM_MUTATION };
