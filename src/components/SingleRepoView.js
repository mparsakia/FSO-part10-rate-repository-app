import React from 'react';
import RepositoryItem from './RepositoryItem';

function countFormatter(num) {
  let count = 0;
  if (num >= 1000) {
    count = `${Math.round((num / 1000) * 10) / 10}k`;
    return count;
  } else {
    return num;
  }
}

const SingleRepoView = ({ repository }) => {
  console.log('log singlerepoview props', repository);

  const stargazersFormatted = countFormatter(repository.stargazersCount);
  const forksCountFormatted = countFormatter(repository.forksCount);
  const reviewCountFormatted = countFormatter(repository.reviewCount);
  const ratingAverageFormatted = countFormatter(repository.ratingAverage);

  return (
    <RepositoryItem
      id={repository.id}
      fullName={repository.fullName}
      description={repository.description}
      language={repository.language}
      forksCount={forksCountFormatted}
      stargazersCount={stargazersFormatted}
      ratingAverage={ratingAverageFormatted}
      reviewCount={reviewCountFormatted}
      ownerAvatarUrl={repository.ownerAvatarUrl}
      url={repository.url}
    />
  );
};

export default SingleRepoView;
