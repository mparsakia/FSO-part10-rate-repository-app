import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  appTabItem: {
    color: 'slategray',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 15,
  },
});

const AppBarTab = ({ title, link }) => (
  <TouchableWithoutFeedback>
    <Link to={link}>
      <Text style={styles.appTabItem}>{title}</Text>
    </Link>
  </TouchableWithoutFeedback>
);

export default AppBarTab;
