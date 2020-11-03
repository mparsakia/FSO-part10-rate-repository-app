import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import Text from '../components/Text';

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

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

  let logInOrOutButton;
  if (user) {
    logInOrOutButton = (
      <AppBarTab title="Sign Out" link={'/'} onPress={signOut} />
    );
  } else {
    logInOrOutButton = <AppBarTab title="Sign In" link={'/signin'} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab title="Repos" link={'/'} />
        {logInOrOutButton}
      </ScrollView>
    </View>
  );
};

export default AppBar;
