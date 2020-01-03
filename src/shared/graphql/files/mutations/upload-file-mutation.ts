import gql from 'graphql-tag';
import { ReactNativeFile } from 'apollo-upload-client';

export interface UploadFileMutationData {
  createFile: {
    name: string;
    url: string;
  };
}

export interface UploadFileMutationVariables {
  upload: ReactNativeFile;
}

const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFileMutation($upload: Upload!) {
    createFile(upload: $upload) {
      name
      url
    }
  }
`;

export { UPLOAD_FILE_MUTATION };
