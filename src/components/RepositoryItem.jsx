import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'white',
  },
  image: {
    width: 64,
    height: 64,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  imagePad: {
    paddingHorizontal: 10,
  },
  repoHeadTxt: {
    paddingBottom: 5,
  },
  repoInfo: {
    justifyContent: 'space-evenly',
    paddingTop: 5,
  },
  tag: {
    backgroundColor: 'gold',
    color: 'black',
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  repoStatsTxt: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'wheat',
    padding: 10,
    marginVertical: 20,
  },
});

const RepositoryItem = (props) => {
  function countFormatter(num) {
    let count = 0;
    if (num >= 1000) {
      count = `${Math.round((num / 1000) * 10) / 10}k`;
      return count;
    } else {
      return num;
    }
  }

  const stargazersFormatted = countFormatter(props.stargazersCount);
  const forksCountFormatted = countFormatter(props.forksCount);
  const reviewCountFormatted = countFormatter(props.reviewCount);
  const ratingAverageFormatted = countFormatter(props.ratingAverage);

  // console.log('REPOITEM PROPS', props);

  return (
    <Link
      to={`/repository/${props.id}`}
      component={TouchableOpacity}
      key={props.id}>
      <View style={styles.container} key={props.id}>
        <View style={styles.flexRow}>
          <Image style={styles.image} source={{ uri: props.ownerAvatarUrl }} />
          <View style={styles.imagePad}>
            <Text
              testID="fullName"
              fontWeight="bold"
              fontSize="subheading"
              style={styles.repoHeadTxt}>
              {props.fullName}
            </Text>
            <Text testID="description" style={styles.repoHeadTxt}>
              {props.description}
            </Text>
            <Text testID="language" style={styles.tag}>
              {props.language}
            </Text>
          </View>
        </View>
        <View style={[styles.flexRow, styles.repoInfo]}>
          <Text testID="Stars" style={styles.repoStatsTxt}>
            {stargazersFormatted}
            {'\n'}
            {'Stars'}
          </Text>
          <Text testID="Forks" style={styles.repoStatsTxt}>
            {forksCountFormatted}
            {'\n'}
            {'Forks'}
          </Text>
          <Text testID="Reviews" style={styles.repoStatsTxt}>
            {reviewCountFormatted}
            {'\n'}
            {'Reviews'}
          </Text>
          <Text testID="Rating" style={styles.repoStatsTxt}>
            {ratingAverageFormatted}
            {'\n'}
            {'Rating'}
          </Text>
        </View>
        {props.url ? (
          <View style={styles.button}>
            <Button
              testID="openGithub"
              title="view on github"
              onPress={() => {
                Linking.openURL(props.url);
              }}></Button>
          </View>
        ) : null}
      </View>
    </Link>
  );
};

export default RepositoryItem;
