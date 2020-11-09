import React from 'react';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';
import SingleRepoView from './SingleRepoView';

const SingleRepo = () => {
  const { id } = useParams();
  console.log('log SingleRepo id', id);

  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  const repository = data?.repository;

  if (loading) return null;

  return <SingleRepoView repository={repository} />;
};

export default SingleRepo;
