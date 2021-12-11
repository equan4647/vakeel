import React from 'react';
import { View } from 'react-native';

import { SearchInput, FilterBar, TopicsList } from '../../common';
import { CATEGORY_SCREEN_PARAMS } from '../../config/Constants';
import { TopicsData } from '../../data/topics';
import { AppStyles } from '../../theme';
import { NavigationService } from '../../utils';
import styles from './styles';

const SearchedTopics = ({ navigation, route }) => {
  NavigationService.hideHeader(navigation);

  const onFilterPress = () => {
    NavigationService.navigate('FiltersTopic');
  };

  return (
    <View style={AppStyles.flex}>
      <SearchInput
        isHeader
        value={route?.params?.keyword + ' in Network'}
        onPress={() =>
          NavigationService.navigate(
            'SearchScreen',
            CATEGORY_SCREEN_PARAMS.SEARCH_TOPICS
          )
        }
      />
      <FilterBar onPress={onFilterPress} results={20} filters={0} />
      <TopicsList data={TopicsData.list} />
    </View>
  );
};

export default SearchedTopics;
