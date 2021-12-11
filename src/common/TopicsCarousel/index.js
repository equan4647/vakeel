import React from 'react';
import { FlatList, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { TopicCarouselItem } from '..';
import styles from './styles';

const TopicsCarousel = props => {
  const { style, contentContainerStyle, data, onItemPress } = props;
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      {...{ style, contentContainerStyle, data }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TopicCarouselItem {...{ onItemPress, ...item }} />
      )}
      horizontal
      directionalLockEnabled
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

TopicsCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  onItemPress: PropTypes.func,
};
TopicsCarousel.defaultProps = {
  data: [],
};

export default TopicsCarousel;
