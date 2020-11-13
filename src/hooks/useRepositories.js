import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortList, searchWord) => {
  console.log('clog from useRepositories props:', sortList, searchWord);

  let variables;

  if (sortList) {
    switch (sortList) {
      case 'DESC':
        variables = {
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'DESC',
        };
        break;
      case 'ASC':
        variables = {
          orderBy: 'RATING_AVERAGE',
          orderDirection: 'ASC',
        };
        break;
      case 'DEFAULT':
        variables = {
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
        };
      default:
        variables = {
          orderBy: 'CREATED_AT',
          orderDirection: 'DESC',
        };
        break;
    }

    variables.searchKeyword = searchWord;

    const { loading, refetch, data, ...result } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables,
    });
    console.log('clog from useRepositories result', result);

    let rtnobj = {
      repositories: data ? data.repositories : null,
      loading,
      refetch,
      ...result,
    };
    return rtnobj;
  } else {
    // i.e. when the app first loads / someone doesn't interact with the dropdown menu
    const { loading, refetch, data, ...result } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: {
        searchKeyword: searchWord,
      },
    });

    console.log('clog from useRepositories result', result);

    let rtnobj = {
      repositories: data ? data.repositories : null,
      loading,
      refetch,
      ...result,
    };
    return rtnobj;
  }
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
