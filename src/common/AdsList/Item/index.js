import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text, ImageViewHttpRound } from '../../../components';
import { NavigationService, Util } from '../../../utils';
import { ClassifiedUtil } from '../../../DataUtils';
import { FavoriteButton } from '../../../common';
import { Images } from '../../../theme';
import styles from './styles';

import { classifiedSelectors } from '../../../ducks/classified';

const Item = ({ item }) => {
  const classifiedItem = useSelector(
    classifiedSelectors.getClassifiedItem(item)
  );

  const onPressFavorite = isFavourite =>
    Util.addClassifiedToFavorites(item, isFavourite);

  const showFavourite = ClassifiedUtil.showFavourite(classifiedItem);
  //console.log('classifiedItem', classifiedItem);

  return (
    <ButtonView
      style={styles.container}
      onPress={() => {
        NavigationService.push('ClassifiedDetail', { classifiedId: item });
      }}
    >
      <ImageViewHttpRound
        url={ClassifiedUtil.coverImage(classifiedItem)}
        size={85}
        borderRadius={8}
        style={styles.imageView}
      />
      <View style={styles.contentStyle}>
        <View style={styles.infoContainer}>
          <View style={styles.priceAndTitleContainer}>
            <Text size="size_16" numberOfLines={2} style={styles.title}>
              {ClassifiedUtil.title(classifiedItem)}
            </Text>

            <Text size="size_14" type="bold">
              {ClassifiedUtil.price(classifiedItem)}
            </Text>
          </View>

          {showFavourite ? (
            <FavoriteButton
              favorite={ClassifiedUtil.isFavourite(classifiedItem)}
              style={styles.favourite}
              {...{ onPressFavorite }}
            />
          ) : null}
        </View>
        <View style={styles.locationContainer}>
          <Image
            source={Images.icons.location}
            style={styles.locationImg}
            resizeMode="contain"
          />

          <Text style={styles.location} size="size_12" numberOfLines={1}>
            {ClassifiedUtil.address(classifiedItem)}
          </Text>

          <Text size="size_12">
            {ClassifiedUtil.createdAtFormat(classifiedItem)}
          </Text>
        </View>
      </View>
    </ButtonView>
  );
};

Item.propTypes = {
  item: PropTypes.any.isRequired,
};
Item.defaultProps = {};

export default React.memo(Item, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});
