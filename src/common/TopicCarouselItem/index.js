import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import PropTypes from 'prop-types';

import { FavoriteButton } from '..';
import { ButtonView, Text } from '../../components';
import { AppStyles } from '../../theme';
import styles from './styles';
import { NavigationService } from '../../utils';

const TopicCarouselItem = props => {
  const { title, desc, image, viewsCount, date, onItemPress } = props,
    [favorite, toggleFavorite] = useState(false);

  const onPressFavorite = () => toggleFavorite(isFav => !isFav);

  return (
    <ButtonView onPress={onItemPress ?? viewTopic}>
      <ImageBackground
        source={image}
        imageStyle={styles.img}
        style={styles.imgContainer}
      >
        <FavoriteButton
          {...{ favorite, onPressFavorite }}
          circle
          style={styles.favorite}
        />
      </ImageBackground>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.desc} numberOfLines={2}>
        {desc}
      </Text>

      <View style={AppStyles.spreadRowAligned}>
        <Text size="size_14">{viewsCount} Views</Text>
        <Text size="size_14">{date}</Text>
      </View>
    </ButtonView>
  );
};

TopicCarouselItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  views: PropTypes.number,
  date: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
TopicCarouselItem.defaultProps = {
  title: '',
  desc: '',
};

export default TopicCarouselItem;

function viewTopic() {
  NavigationService.navigate('ViewTopic');
}
