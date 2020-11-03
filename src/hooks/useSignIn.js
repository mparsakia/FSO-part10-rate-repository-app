import { AUTHORIZE } from '../graphql/mutations';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const [mutate, response] = useMutation(AUTHORIZE, {});

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        username,
        password,
      },
    });
    console.log('response log from UseSignIn.jsx', response);

    try {
      await authStorage.setAccessToken(response.data.authorize.accessToken);
      apolloClient.resetStore();
    } catch (e) {
      console.log(e);
    }

    return response;
  };

  return [signIn, response];
};

export default useSignIn;
