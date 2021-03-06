import React from 'react';
import { StyleSheet, View } from 'react-native';
// SafeAreaView can be wrapped at the highest level to ensure the app view
// isnt covered by phone notches, rounded corners, etc...
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepo from './SingleRepo';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>

        <Route path="/" exact>
          <RepositoryList />
        </Route>

        <Route path="/repository/:id" exact>
          <SingleRepo />
        </Route>

        <Route path="/createreview" exact>
          <CreateReview />
        </Route>

        <Route path="/signup" exact>
          <SignUp />
        </Route>

        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
