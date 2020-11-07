import React from 'react';
import { RepositoryListContainer } from '../components/RepositoryList';
import { render } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here

      function countFormatter(num) {
        let count = 0;
        if (num >= 1000) {
          count = `${Math.round((num / 1000) * 10) / 10}k`;
        } else {
          count = num.toString();
        }
        return count;
      }

      const { queryAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      //   console.log('CONLOG TEST', repositories.edges[0].node.fullName);
      //   //outputs: jaredpalmer/formik

      const fullNameText = queryAllByTestId('fullName');

      expect(fullNameText[0]).toHaveTextContent(
        repositories.edges[0].node.fullName
      );

      const descriptionText = queryAllByTestId('description');
      expect(descriptionText[0]).toHaveTextContent(
        repositories.edges[0].node.description
      );

      const languageText = queryAllByTestId('language');
      expect(languageText[0]).toHaveTextContent('TypeScript');

      const forkCountText = queryAllByTestId('Forks');
      expect(forkCountText[0]).toHaveTextContent(
        countFormatter(repositories.edges[0].node.forksCount).toString()
      );

      const stargazersText = queryAllByTestId('Stars');
      expect(stargazersText[0]).toHaveTextContent(
        countFormatter(repositories.edges[0].node.stargazersCount).toString()
      );

      const reviewCountText = queryAllByTestId('Reviews');
      expect(reviewCountText[0]).toHaveTextContent('3');

      const ratingAverageText = queryAllByTestId('Rating');
      expect(ratingAverageText[0]).toHaveTextContent('88');
    });
  });
});
