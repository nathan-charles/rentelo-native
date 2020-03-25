import React from 'react';
import { Keyboard, ActivityIndicator, Alert, Image, View, ScrollView } from 'react-native';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { Button, HelperText, Text, TextInput, Snackbar } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { ReactNativeFile } from 'apollo-upload-client';
import * as yup from 'yup';
// import ImagePicker from 'react-native-image-crop-picker';

import { CURRENT_USER_QUERY, CurrentUserQueryData } from '../../shared/graphql/user/queries/current-user-query';

import styles from './edit-item.styles';

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

import { HeaderButton } from '../../components';
import Attachments from './attachments';

interface FormData {
  name: string;
  description: string;
}

const EditItemSchema = yup.object().shape({
  name: yup // Name
    .string()
    .label('Name')
    .required(),
  description: yup // Description
    .string()
    .label('Description')
    .required(),
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

  const { register, setValue, handleSubmit, errors } = useForm<FormData>({
    validationSchema: EditItemSchema,
  });

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

  const onSubmit = handleSubmit(({ name, description }) => {
    console.log(name, description);
  }); // firstName and lastName will have corre

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

  // Destructure styles
  const { containerStyle, contentStyle, formStyle, fieldStyle } = styles;

  return (
    <View style={containerStyle}>
      <ScrollView contentContainerStyle={contentStyle}>
        {/* <Image source={{ uri: imageSource }} style={{ width: 100, height: 100 }} /> */}
        {/* <Text style={{ fontSize: 10 }}>{fileData}</Text> */}
        <View style={formStyle}>
          <View style={fieldStyle}>
            <TextInput
              testID="input-name"
              ref={() => register({ name: 'name' })}
              mode="outlined"
              selectionColor="#F63440"
              label="Name"
              placeholderTextColor="#F6868D"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              keyboardAppearance="dark"
              onChangeText={(text) => setValue('name', text, true)}
              error={!!errors.name}
            />
            {errors.name && (
              <HelperText type="error" visible={!!errors.name}>
                {errors.name.message}
              </HelperText>
            )}
          </View>
          <View style={fieldStyle}>
            <TextInput
              testID="input-description"
              ref={() => register({ name: 'description' })}
              mode="outlined"
              selectionColor="#F63440"
              label="Description"
              placeholderTextColor="#F6868D"
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              keyboardAppearance="dark"
              onChangeText={(text) => setValue('description', text, true)}
              error={!!errors.description}
            />
            {errors.description && (
              <HelperText type="error" visible={!!errors.description}>
                {errors.description.message}
              </HelperText>
            )}
          </View>
          <Text>{JSON.stringify(errors, null, 2)}</Text>
        </View>
      </ScrollView>
    </View>
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
