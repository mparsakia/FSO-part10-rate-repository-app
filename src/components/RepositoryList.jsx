import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'gainsboro',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <RepositoryItem
      key={item.id}
      id={item.id}
      fullName={item.fullName}
      description={item.description}
      language={item.language}
      stargazersCount={item.stargazersCount}
      forksCount={item.forksCount}
      reviewCount={item.reviewCount}
      ratingAverage={item.ratingAverage}
      ownerAvatarUrl={item.ownerAvatarUrl}
    />
  );

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  // when you start using state and hooks the order of declaring the code matters...
  // sortlist wouldn't update repositories when the lines were switched
  const [sortList, setsortList] = useState(null);
  const { repositories } = useRepositories(sortList);

  return (
    <View>
      <RNPickerSelect
        onValueChange={(value) => {
          console.log('RNPickerValue', value);
          setsortList(value);
        }}
        items={[
          { label: 'Highest Rated', value: 'DESC' },
          { label: 'Lowest Rated', value: 'ASC' },
        ]}
        placeholder={{
          label: 'Sort by Default',
          value: 'DEFAULT',
        }}
      />
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};
export default RepositoryList;
