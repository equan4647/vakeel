import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text, ImageViewHttpBackground } from '../../components';
import { FavoriteButton, StarRating } from '..';
import { NavigationService, Util } from '../../utils';
import { RATING_TYPE } from '../../config/Constants';
import { Metrics } from '../../theme';
import styles from './styles';

import { productSelectors } from '../../ducks/products';
import { ProductUtil } from '../../DataUtils';
import { View } from 'react-native';

const BuyingItem = ({ item, isList }) => {
  const productItem = useSelector(productSelectors.getProductItem(item));

  const onPress = () => NavigationService.push('ViewBuyingProduct', { item });
  const onPressFavorite = isFav => Util.AddProductToFavorites(item, isFav);

  const isDiscounted = ProductUtil.isDiscounted(productItem);

  const width = isList
      ? Metrics.productImageWidthList
      : Metrics.productImageWidthCarousel,
    height = isList
      ? Metrics.productImageHeightList
      : Metrics.productImageHeightCarousel;

  return (
    <ButtonView debounceTime={700} style={{ width }} {...{ onPress }}>
      <ImageViewHttpBackground
        url={ProductUtil.getProductCoverImage(productItem)}
        {...{ width, height }}
      >
        <FavoriteButton
          favorite={ProductUtil.isFavourite(productItem)}
          style={styles.favorite}
          {...{ onPressFavorite }}
          circle
        />
        {/* <CartComponent id={item} /> */}
      </ImageViewHttpBackground>

      <Text size="size_16" style={styles.title} numberOfLines={1}>
        {ProductUtil.getProductTitle(productItem)}
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          {isDiscounted
            ? ProductUtil.getDiscountedPrice(productItem)
            : ProductUtil.getProductPrice(productItem)}
        </Text>
        {isDiscounted && (
          <Text style={styles.discoutedPrice}>
            {ProductUtil.getProductPrice(productItem)}
          </Text>
        )}
      </View>

      <StarRating
        type={RATING_TYPE.RATING_WITHOUT_COUNT}
        rating={ProductUtil.getAverageRating(productItem)}
      />
    </ButtonView>
  );
};

BuyingItem.propTypes = {
  item: PropTypes.string.isRequired,
  isList: PropTypes.bool,
};
BuyingItem.defaultProps = {
  isList: false,
};

export default React.memo(BuyingItem, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});
