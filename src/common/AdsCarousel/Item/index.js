import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text, ImageViewHttpBackground } from '../../../components';
import { ClassifiedUtil } from '../../../DataUtils';
import { NavigationService, Util } from '../../../utils';
import { Images, Metrics } from '../../../theme';
import { FavoriteButton } from '../..';
import styles from './styles';

import { classifiedSelectors } from '../../../ducks/classified';

const Item = ({ item }) => {
  const classifiedItem = useSelector(
    classifiedSelectors.getClassifiedItem(item)
  );

  const onPressFavorite = isFavourite =>
    Util.addClassifiedToFavorites(item, isFavourite);

  return (
    <ButtonView
      debounceTime={700}
      style={styles.container}
      onPress={() => {
        NavigationService.push('ClassifiedDetail', { classifiedId: item });
      }}
    >
      <ImageViewHttpBackground
        url={ClassifiedUtil.coverImage(classifiedItem)}
        width={Metrics.classifiedImageWidthCarousel}
        height={Metrics.classifiedImageHeightCarousel}
      >
        <FavoriteButton
          favorite={ClassifiedUtil.isFavourite(classifiedItem)}
          style={styles.favorite}
          circle
          {...{ onPressFavorite }}
        />
      </ImageViewHttpBackground>

      <Text style={styles.title} numberOfLines={1} size="size_16">
        {ClassifiedUtil.title(classifiedItem)}
      </Text>

      <Text numberOfLines={1} style={styles.priceStyle}>
        {ClassifiedUtil.price(classifiedItem)}
      </Text>

      <View style={styles.locationContainer}>
        <Image source={Images.icons.location} style={styles.locationImg} />

        <Text style={styles.location} size="size_12" numberOfLines={1}>
          {ClassifiedUtil.address(classifiedItem)}
        </Text>
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
