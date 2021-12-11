import React from 'react';
import { FlatList, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { FoodItem } from '..';
import styles from './styles';
import { getRestaurants } from '../../ducks/restaurants/selectors';
import EmptyViewCarousel from '../EmptyViewCarousel';

const FoodCarousel = props => {
  const { style, contentContainerStyle, identifier } = props;

  const data = useSelector(getRestaurants(identifier));

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      {...{ style, contentContainerStyle, data }}
      keyExtractor={({ _id }) => _id}
      renderItem={({ item }) => <FoodItem id={item} />}
      horizontal
      directionalLockEnabled
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={() => <EmptyViewCarousel />}
    />
  );
};

FoodCarousel.propTypes = {
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  identifier: PropTypes.string.isRequired,
};
FoodCarousel.defaultProps = {
  identifier: '',
};

export default FoodCarousel;
