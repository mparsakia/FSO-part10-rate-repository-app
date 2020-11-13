import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

import { CREATE_REVIEW } from '../graphql/mutations';
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
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Username is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number('Rating must be a number between 0 - 100')
    .min(0)
    .max(100)
    .required('Rating is required'),
  text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => (
  <View>
    <View style={styles.form}>
      <FormikTextInput
        style={styles.form}
        name="ownerName"
        placeholder="Github Repo Owner's Username"
      />
      <View style={styles.form}>
        <FormikTextInput
          name="repositoryName"
          placeholder="Github Repo Owner's Repository Name"
        />
      </View>
      <View style={styles.form}>
        <FormikTextInput name="rating" placeholder="Your Rating 0 - 100" />
      </View>
      <View style={styles.form}>
        <FormikTextInput name="text" placeholder="Your Comments" />
      </View>
      <View style={styles.submitbtn}>
        <Text style={styles.submitbtn} onPress={onSubmit}>
          Submit your review
        </Text>
      </View>
    </View>
  </View>
);

const SubmitReview = () => {
  const [reviewMutation] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const convertRating = Number(rating);
    try {
      const { data } = await reviewMutation({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: convertRating,
            text,
          },
        },
      });

      console.log('response log from createreview.jsx', JSON.stringify(data));
      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SubmitReview;
