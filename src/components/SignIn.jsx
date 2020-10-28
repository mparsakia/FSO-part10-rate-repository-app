import React from 'react';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';

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

const onSubmit = (values) => {
  console.log('user: ', values.username);
  console.log('pass: ', values.password);
};

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  return (
    <View>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
