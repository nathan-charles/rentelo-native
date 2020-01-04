import React from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import { Container, Content, View, ListItem, Text, Button } from 'native-base';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import * as yup from 'yup';

import {
  CREATE_PAYOUT_ACCOUNT_MUTATION,
  PayoutAccountInput,
  CreatePayoutAccountMutationData,
  CreatePayoutAccountMutationVariables,
} from '../../shared/graphql/user/mutations/create-payout-account-mutation';

import { InputField, InputMaskField, HeaderButton } from '../../components';

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

const SetupMerchantAccount: NavigationStackScreenComponent<NavigationStackScreenProps> = ({ navigation }) => {
  // Create Payment Account Mutation Hook
  const [createPaymentAccountMutation] = useMutation<
    CreatePayoutAccountMutationData,
    CreatePayoutAccountMutationVariables
  >(CREATE_PAYOUT_ACCOUNT_MUTATION, { refetchQueries: () => ['CurrentUserQuery'] });

  return (
    <Container>
      <Content>
        <Formik
          initialValues={{
            firstName: 'Nathan',
            lastName: 'Charles',
            dob: '12/22/1984', // birthday && moment(birthday).format('MM/DD/YYYY'),
            ssn: '7631',
            email: 'nathan.charles@me.com',
            phone: '2149865391',
            addressLine1: '1317 Mary Horn Ln',
            addressLine2: '',
            city: 'Savannah',
            state: 'TX',
            zip: '76227',
            bankRoutingNumber: '110000000',
            bankAccountNumber: '000123456789',
            bankAccountNumberVerify: '000123456789',
          }}
          onSubmit={async (values, actions) => {
            Keyboard.dismiss();
            try {
              // Create payout input object
              const input: PayoutAccountInput = { ...values };

              // Remove bank account verification from input before posting
              // delete input.bankAccountNumberVerify;

              console.log(
                'Create Merchant Account Payload',
                JSON.stringify(values, null, 2),
                JSON.stringify(input, null, 2)
              );

              // await createPaymentAccountMutation({ variables: { input } });

              // await createPaymentAccountMutation({
              //   variables: {
              //     input: {
              //       firstName: values.firstName,
              //       lastName: values.lastName,
              //       dob: values.dob,
              //       ssn: values.ssn,
              //       email: values.email,
              //       phone: values.phone,
              //       addressLine1: values.addressLine1,
              //       addressLine2: values.addressLine2,
              //       city: values.city,
              //       state: values.state,
              //       zip: values.zip,
              //       bankRoutingNumber: values.bankRoutingNumber,
              //       bankAccountNumber: values.bankAccountNumber,
              //     },
              //   },
              // });
            } catch (error) {
              console.log('Create Merchant Account Error', error);
              actions.setFieldError('general', error.message);
            } finally {
              actions.setSubmitting(false);
            }

            // try {
            //   console.log('Create Merchant Account Payload', JSON.stringify(values));
            //   const createMerchantAccount = functions.httpsCallable('createMerchantAccount');
            //   const result = await createMerchantAccount(values);
            //   console.log('Create Merchant Account Result', JSON.stringify(result));
            //   const { data } = result;
            //   // const { status, id } = data;
            //   const { bankAccountNumber } = values;
            //   await database
            //     .collection('merchants')
            //     .doc(uid)
            //     .set({ merchant: { ...data, bankLast4: bankAccountNumber.substr(bankAccountNumber.length - 4) } });
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
                <Text>PERSONAL INFORMATION</Text>
              </ListItem>
              <View padder>
                <InputField
                  label="First Name"
                  placeholder="John"
                  autoCorrect={false}
                  autoCapitalize="words"
                  formikProps={formikProps}
                  formikKey="firstName"
                />
                <InputField
                  label="Last Name"
                  placeholder="Doe"
                  autoCorrect={false}
                  autoCapitalize="words"
                  formikProps={formikProps}
                  formikKey="lastName"
                />
                <InputMaskField
                  label="Date of Birth"
                  type="datetime"
                  options={{
                    format: 'MM/DD/YYYY',
                  }}
                  keyboardType="number-pad"
                  placeholder="MM/DD/YYYY"
                  formikProps={formikProps}
                  formikKey="dob"
                />
                <InputMaskField
                  label="SSN"
                  type="custom"
                  options={{
                    mask: '9999',
                    getRawValue(value) {
                      return value.replace(/-/g, '');
                    },
                  }}
                  keyboardType="number-pad"
                  placeholder="000-00-0000"
                  formikProps={formikProps}
                  formikKey="ssn"
                  note="We need your SSN to verify your identity, we do not store this it's used by our payment processor."
                />
              </View>
              <ListItem itemDivider>
                <Text>CONTACT</Text>
              </ListItem>
              <View padder>
                <InputField
                  label="Email"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholder="john.doe@me.com"
                  formikProps={formikProps}
                  formikKey="email"
                />
                <InputMaskField
                  label="Phone"
                  type="custom"
                  options={{
                    mask: '(999) 999-9999',
                    getRawValue(value) {
                      return value.replace(/\(|\)|\s|-/g, '');
                    },
                  }}
                  keyboardType="number-pad"
                  placeholder="(000) 000-0000"
                  formikProps={formikProps}
                  formikKey="phone"
                />
              </View>
              <ListItem itemDivider>
                <Text>ADDRESS</Text>
              </ListItem>
              <View padder>
                <InputField
                  label="Address 1"
                  autoCorrect={false}
                  autoCapitalize="words"
                  formikProps={formikProps}
                  formikKey="addressLine1"
                />
                <InputField
                  label="Address 2"
                  autoCorrect={false}
                  autoCapitalize="words"
                  formikProps={formikProps}
                  formikKey="addressLine2"
                />
                <InputField
                  label="City"
                  autoCorrect={false}
                  autoCapitalize="words"
                  formikProps={formikProps}
                  formikKey="city"
                />
                <InputField
                  label="State"
                  autoCorrect={false}
                  autoCapitalize="words"
                  formikProps={formikProps}
                  formikKey="state"
                />
                <InputField label="Zip" autoCorrect={false} formikProps={formikProps} formikKey="zip" />
              </View>
              <ListItem itemDivider>
                <Text>BANKING</Text>
              </ListItem>
              <View padder>
                <InputField
                  label="Routing Number"
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  formikProps={formikProps}
                  formikKey="bankRoutingNumber"
                />
                <InputField
                  label="Account Number"
                  autoCorrect={false}
                  autoCapitalize="none"
                  formikProps={formikProps}
                  formikKey="bankAccountNumber"
                />
                <InputField
                  label="Verify Account Number"
                  autoCorrect={false}
                  autoCapitalize="none"
                  formikProps={formikProps}
                  formikKey="bankAccountNumberVerify"
                />
              </View>
              <View padder>
                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <React.Fragment>
                    <Button block onPress={formikProps.handleSubmit}>
                      <Text>SUBMIT</Text>
                    </Button>
                    <Text style={{ color: 'red' }}>{formikProps.errors.general}</Text>
                  </React.Fragment>
                )}
              </View>
            </React.Fragment>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

SetupMerchantAccount.navigationOptions = ({ navigation }) => {
  return {
    title: 'Payout Account',
    headerLeft: () => <HeaderButton text="CANCEL" onPress={() => navigation.dismiss()} />,
  };
};

export default SetupMerchantAccount;
