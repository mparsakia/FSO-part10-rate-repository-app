import React from 'react';
import { Text } from 'react-native';

const RepositoryItem = (props) => (
  <Text>
    Full Name: {props.fullName}
    <br />
    Desc: {props.description}
    <br />
    Lang: {props.language}
    <br />
    Stars: {props.stargazersCount}
    <br />
    Forks: {props.forksCount}
    <br />
    Reviews: {props.reviewCount}
    <br />
    Rating: {props.ratingAverage}
  </Text>
);

export default RepositoryItem;
