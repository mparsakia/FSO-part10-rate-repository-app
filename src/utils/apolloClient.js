import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = () => {
  return new ApolloClient({
    // configure in dotenv file as APOLLO_URI
    uri: Constants.manifest.extra.apolloUri,
  });
};

export default createApolloClient;
