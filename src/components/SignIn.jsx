import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'linen',
    padding: 15,
    margin: 15,
  },
  submitbtn: {
    margin: 15,
    backgroundColor: 'midnightblue',
    color: 'white',
    padding: 15,
    fontSize: 22,
    borderRadius: 5,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Form = ({ onSubmit }) => (
  <View style={styles.form}>
    <FormikTextInput
      name="username"
      placeholder="Username"
      style={styles.form}
    />
    <FormikTextInput
      secureTextEntry
      name="password"
      placeholder="Password"
      style={styles.form}
    />
    <TouchableWithoutFeedback onPress={onSubmit}>
      <Text
        fontWeight="bold"
        center
        fontSize="subheading"
        style={styles.submitbtn}>
        Sign In
      </Text>
    </TouchableWithoutFeedback>
  </View>
);

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    console.log('user: ', values.username);
    console.log('pass: ', values.password);
    const { username, password } = values;

    try {
      const response = await signIn({ username, password });
      console.log('response log from SignIn.jsx', response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
