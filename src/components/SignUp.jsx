import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { SIGN_UP } from '../graphql/mutations';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'linen',
    padding: 15,
    margin: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 30,
  },
  submitbtn: {
    margin: 15,
    backgroundColor: 'midnightblue',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 15,
    borderRadius: 5,
  },
  err: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordconfirm: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password name is required'),
  passwordconfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignUpFormik = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <View style={styles.form}>
        <FormikTextInput name="username" placeholder="username" />
      </View>

      <View style={styles.form}>
        <FormikTextInput
          name="password"
          placeholder="password"
          secureTextEntry
        />
      </View>
      <View style={styles.form}>
        <FormikTextInput
          name="passwordconfirm"
          placeholder="confirm password"
          secureTextEntry
        />
      </View>
      <View style={styles.submitbtn}>
        <Text style={styles.submitbtn} onPress={onSubmit}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

const SignUp = () => {
  //deconstruct the error msg from the apollo gql response
  const [signUpMutation, { error }] = useMutation(SIGN_UP);
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const response = await signUpMutation({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      //   console.log('clog response', response);

      if (response.data.createUser) {
        const authed = await signIn({ username, password });
        //console.log('clog authed', authed);
        if (authed) {
          history.push('/');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      {error ? <Text style={styles.err}>{error.message}</Text> : null}

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => <SignUpFormik onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;
