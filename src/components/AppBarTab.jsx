import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  appTabItem: {
    color: 'midnightblue',
    fontSize: 28,
    fontWeight: 'bold',
    padding: 15,
  },
});

const AppBarTab = ({ title, link, onPress }) => (
  <TouchableWithoutFeedback>
    <Link
      to={link}
      component={TouchableOpacity}
      onPress={onPress}
      activeOpacity={0.3}>
      <Text style={styles.appTabItem}>{title}</Text>
    </Link>
  </TouchableWithoutFeedback>
);

export default AppBarTab;
