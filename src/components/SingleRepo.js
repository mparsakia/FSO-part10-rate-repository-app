import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { format, parseISO } from 'date-fns';

import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';
import SingleRepoView from './SingleRepoView';
import { FlatList } from 'react-native';

const width = 50;
const height = width;

const styles = StyleSheet.create({
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  reviewContainerCol: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 5,
    borderColor: 'lightgrey',
  },
  circleRating: {
    height,
    width,
    borderRadius: '50%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'blue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '25px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  flexShrink: {
    flexShrink: 1,
  },
  userAndDate: {
    fontSize: 16,
    marginTop: '10px',
    marginLeft: '10px',
  },
  reviewsHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderColor: 'gold',
  },
});

const SingleRepo = () => {
  const { id } = useParams();

  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  const repository = data?.repository;
  const reviewsArray = data?.repository.reviews.edges;

  //console.log('log SingleRepo repository', repository);

  const renderItem = ({ item }) => {
    // console.log('renderitem prop item', item);
    return (
      <View style={styles.reviewContainerCol}>
        <View style={styles.reviewContainer}>
          <Text style={styles.circleRating}>{item.node.rating}</Text>
          <Text style={styles.userAndDate}>
            {item.node.user.username} <br></br>
            {format(parseISO(item.node.createdAt), 'dd.MM.yyyy')}
          </Text>
        </View>

        <Text>{item.node.text}</Text>
      </View>
    );
  };

  if (loading) return null;

  return (
    <View>
      <SingleRepoView repository={repository} />
      <Text style={styles.reviewsHeader}>Reviews:</Text>

      <FlatList
        data={reviewsArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        keyExtractor={({ node: { id } }) => id}
      />
    </View>
  );
};

export default SingleRepo;
