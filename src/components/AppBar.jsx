import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'aquamarine',
    display: 'flex',
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'space-around',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab title="Repos" link={'/'} />
        <AppBarTab title="Sign In" link={'/signin'} />
      </ScrollView>
    </View>
  );
};

export default AppBar;
