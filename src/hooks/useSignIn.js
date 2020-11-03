import { AUTHORIZE } from '../graphql/mutations';
import { useMutation } from '@apollo/react-hooks';

const useSignIn = () => {
  const [mutate, response] = useMutation(AUTHORIZE, {});

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        username,
        password,
      },
    });
    console.log('response log from UseSignIn.jsx', response);
    return response;
  };

  return [signIn, response];
};

export default useSignIn;
