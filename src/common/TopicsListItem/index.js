import React, { useState } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';

import { FavoriteButton } from '..';
import { ButtonView, Text } from '../../components';
import { AppStyles } from '../../theme';
import styles from './styles';
import { NavigationService } from '../../utils';

const TopicsListItem = props => {
  const { title, desc, image, viewsCount, date, isMine } = props,
    [favorite, toggleFavorite] = useState(false);

  const onPressFavorite = () => toggleFavorite(isFav => !isFav);

  return (
    <ButtonView
      style={AppStyles.row}
      onPress={() => NavigationService.navigate('ViewTopic', { isMine })}
    >
      <Image source={image} style={styles.img} />

      <View style={styles.content}>
        <View style={AppStyles.spreadRowAligned}>
          <Text size="size_14" type="bold">
            {title}
          </Text>
          <FavoriteButton {...{ favorite, onPressFavorite }} />
        </View>

        <Text size="size_16" numberOfLines={2}>
          {desc}
        </Text>

        <View style={AppStyles.spreadRowAligned}>
          <Text size="size_14">{viewsCount} Views</Text>
          <Text size="size_14">{date}</Text>
        </View>
      </View>
    </ButtonView>
  );
};

TopicsListItem.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  views: PropTypes.number,
  date: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
TopicsListItem.defaultProps = {
  title: '',
  desc: '',
};

export default TopicsListItem;
