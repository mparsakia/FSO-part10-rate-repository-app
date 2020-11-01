import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  //https://www.apollographql.com/docs/react/api/react/hooks/#usequery
  const { loading, refetch, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  let rtnobj = {
    repositories: data ? data.repositories : null,
    loading,
    refetch,
  };

  return rtnobj;
};

export default useRepositories;

// OLD VERSION not using GQL
// import { useState, useEffect } from 'react';

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     // Replace the IP address part with your own IP address!
//     const response = await fetch('http://192.168.50.209:5000/api/repositories');
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

// export default useRepositories;
