import React from 'react';
import { Keyboard, ActivityIndicator, Alert, Image } from 'react-native';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { Container, Content, View, ListItem, Text, Button } from 'native-base';
import { Formik } from 'formik';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ReactNativeFile } from 'apollo-upload-client';
import * as yup from 'yup';
// import ImagePicker from 'react-native-image-crop-picker';

import { CURRENT_USER_QUERY, CurrentUserQueryData } from '../../shared/graphql/user/queries/current-user-query';

import {
  UPLOAD_FILE_MUTATION,
  UploadFileMutationData,
  UploadFileMutationVariables,
} from '../../shared/graphql/files/mutations/upload-file-mutation';

import {
  CREATE_ITEM_MUTATION,
  CreateItemMutationData,
  CreateItemMutationVariables,
} from '../../shared/graphql/item/mutations/create-item-mutation';

import { InputField, InputMaskField, HeaderButton } from '../../components';
import Attachments from './attachments';

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .label('First Name')
    .required(),
  lastName: yup
    .string()
    .label('Last Name')
    .required(),
  dob: yup
    .string()
    .label('Date of Birth')
    .required(),
  ssn: yup
    .string()
    .label('SSN')
    .required(),
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  phone: yup
    .string()
    .label('Phone')
    .required(),
  bankRoutingNumber: yup
    .string()
    .label('Routing Number')
    .required(),
  bankAccountNumber: yup
    .string()
    .label('Account Number')
    .required(),
  bankAccountNumberVerify: yup
    .string()
    .label('Verify Account Number')
    .required()
    // .oneOf([yup.ref('bankAccountNumber'), null], 'Account number does not match')
    .test('account-number-match', 'Account number does not match', function(value) {
      return this.parent.bankAccountNumber === value;
    }),
});

const moneyInputOptions = {
  unit: '$',
  separator: '.',
  delimiter: ',',
  precision: 0,
};

const EditItem: NavigationStackScreenComponent<NavigationStackScreenProps> = ({ navigation }) => {
  // State
  const [fileData, setFileData] = React.useState<string>('');
  const [imageSource, setImageSource] = React.useState<string>('');

  // Fetch current user query hook
  const { data } = useQuery<CurrentUserQueryData>(CURRENT_USER_QUERY);

  if (data == undefined) {
    return null;
  }

  // Get current user
  const {
    viewer: { id: userObjectId },
  } = data;

  // Upload File Mutation Hook
  const [uploadFileMutation] = useMutation<UploadFileMutationData, UploadFileMutationVariables>(UPLOAD_FILE_MUTATION);

  // Create Item Mutation Hook
  const [createItemMutation] = useMutation<CreateItemMutationData, CreateItemMutationVariables>(CREATE_ITEM_MUTATION);

  const handleAddAttachment = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      // Destructure image result from picker
      const { path, sourceURL, filename, mime, data } = image;

      // Create File object
      const file = new ReactNativeFile({
        uri: path,
        type: mime,
        name: filename,
      });

      setImageSource(path);
      setFileData(JSON.stringify(file, null, 2));

      // Upload file
      const res = await uploadFileMutation({ variables: { upload: file } });
      console.log(JSON.stringify(res, null, 2));
      Alert.alert('hell yeah');
    } catch (error) {
      Alert.alert(error.message);
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Container>
      <Content>
        {/* <Image source={{ uri: imageSource }} style={{ width: 100, height: 100 }} /> */}
        {/* <Text style={{ fontSize: 10 }}>{fileData}</Text> */}
        <Formik
          initialValues={{
            name: '',
            description: '',
            pricePerHour: undefined,
            pricePerDay: undefined,
            deposit: undefined,
          }}
          onSubmit={async (values, actions) => {
            Keyboard.dismiss();
            try {
              const isNew = true;

              const fields = {
                name: values.name,
                description: values.description,
                pricePerHour: values.pricePerHour,
                pricePerDay: values.pricePerDay,
              };

              if (isNew) {
                await createItemMutation({
                  variables: {
                    fields: { ...fields, owner: { __type: 'Pointer', id: userObjectId, className: '_User' } },
                  },
                });
              } else {
                await createItemMutation({
                  variables: {
                    fields: { ...fields, owner: { __type: 'Pointer', id: userObjectId, className: '_User' } },
                  },
                });
              }
            } catch (error) {
              console.log('Create Item Error', error);
              actions.setFieldError('general', error.message);
            } finally {
              actions.setSubmitting(false);
            }

            // uploadFileMutation({ variables: { file: '' } });
            // try {
            //   delete values.bankAccountNumberVerify;
            //   console.log('Create Merchant Account Payload', JSON.stringify(values));
            //   await createPaymentAccountMutation({ variables: { input: values } });
            // } catch (error) {
            //   console.log('Create Merchant Account Error', error);
            //   actions.setFieldError('general', error.message);
            // } finally {
            //   actions.setSubmitting(false);
            // }
          }}
          validationSchema={validationSchema}
        >
          {formikProps => (
            <React.Fragment>
              <ListItem itemDivider>
                <Text>PHOTOS</Text>
              </ListItem>
              <Attachments
                attachments={[]}
                onAddAttachment={handleAddAttachment}
                // onSelectAttachment={this._showAttachmentOptions}
              />
              <ListItem itemDivider>
                <Text>ABOUT</Text>
              </ListItem>
              <View padder>
                <InputField
                  label="Name"
                  placeholder="Name of item"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  formikProps={formikProps}
                  formikKey="name"
                />
                <InputField
                  multiline
                  scrollEnabled={false}
                  numberOfLines={4}
                  label="Description"
                  placeholder="Description of item"
                  autoCorrect={false}
                  autoCapitalize="sentences"
                  formikProps={formikProps}
                  formikKey="description"
                />
              </View>
              <ListItem itemDivider>
                <Text>PRICING</Text>
              </ListItem>
              <View padder>
                <InputMaskField
                  type="money"
                  label="PER HOUR"
                  keyboardType="number-pad"
                  placeholder="0.0"
                  options={moneyInputOptions}
                  formikProps={formikProps}
                  formikKey="pricePerHour"
                />
                <InputMaskField
                  type="money"
                  label="PER DAY"
                  keyboardType="number-pad"
                  placeholder="0.0"
                  options={moneyInputOptions}
                  formikProps={formikProps}
                  formikKey="pricePerDay"
                />
                <InputMaskField
                  type="money"
                  label="DEPOSIT"
                  options={moneyInputOptions}
                  keyboardType="number-pad"
                  placeholder="N/A"
                  formikProps={formikProps}
                  formikKey="deposit"
                />
              </View>
            </React.Fragment>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

EditItem.navigationOptions = ({ navigation }) => {
  return {
    title: 'Edit Item',
    headerLeft: () => <HeaderButton text="CANCEL" onPress={() => navigation.dismiss()} />,
    headerRight: () => <HeaderButton dark text="SAVE" onPress={() => navigation.dismiss()} />,
  };
};

export default EditItem;
