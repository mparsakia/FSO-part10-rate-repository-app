import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'papayawhip',
    display: 'flex',
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'space-around',
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const { data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  const user = data ? data.authorizedUser : null;

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    console.log('signOut was executed!');
  };

  let authedUserMenu;
  if (user) {
    authedUserMenu = (
      <>
        <AppBarTab title="Create Review" link="/createreview" />
        <AppBarTab title="Sign Out" link={'/'} onPress={signOut} />
      </>
    );
  } else {
    authedUserMenu = (
      <>
        <AppBarTab title="Sign In" link={'/signin'} />
        <AppBarTab title="Sign Up" link={'/signup'} />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab title="Repos" link={'/'} />
        {authedUserMenu}
      </ScrollView>
    </View>
  );
};

export default AppBar;

//
