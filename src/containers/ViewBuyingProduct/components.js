import { useSelector } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

import {
  EmptyViewCarousel,
  HorizontalTitle,
  QuantitySelector,
  StarRating,
} from '../../common';
import { RATING_TYPE, STAR_SIZE } from '../../config/Constants';
import RatingsReviewItem from '../../common/Ratings&ReviewItem';
import { getProductItem } from '../../ducks/products/selectors';
import { NavigationService, Util } from '../../utils';
import { ProductUtil } from '../../DataUtils';
import { strings } from '../../utils/i18n';
import { AppStyles, Metrics } from '../../theme';
import { Text } from '../../components';
import styles from './styles';
import { API_PRODUCT_REVIEWS } from '../../config/WebService';

const TitlePriceRating = ({ data, price, isDiscounted, discountedPrice }) => (
  <>
    <Text type="semiBold" size="size_25">
      {ProductUtil.getProductTitle(data)}
    </Text>
    <StarRating
      type={RATING_TYPE.RATING_WITH_COUNT}
      rating={ProductUtil.getAverageRating(data)}
      style={styles.rating}
      count={ProductUtil.getRatingCount(data)}
      size={STAR_SIZE.MEDIUM}
    />
    <View style={styles.priceContainer}>
      <Text style={styles.priceTextStyle}>
        {isDiscounted ? discountedPrice : price}
      </Text>
      {isDiscounted && (
        <Text style={styles.discountedPriceTextStyle}>{price}</Text>
      )}
    </View>
  </>
);

const Title = React.memo(({ title, rightTitle, onPress }) => (
  <HorizontalTitle
    bar
    barStyle={[styles.barStyle]}
    {...{ title, rightTitle, onPress }}
  />
));

/* rating======== */
const RatingList = React.memo(({ _id }) => {
  const data = useSelector(getProductItem(_id)),
    ratingCount = ProductUtil.getRatingCount(data),
    averageRating = ProductUtil.getAverageRating(data),
    ratingData = ProductUtil.getRecentRating(data),
    isRated = ratingData?.length > 0,
    url = API_PRODUCT_REVIEWS,
    payload = { item_id: _id };
  console.log({ ratingCount, averageRating, data });
  return (
    <>
      <Title
        title={strings('app.rating_and_reviews')}
        rightTitle={isRated ? strings('app.see_all') : undefined}
        onPress={() =>
          NavigationService.navigate('RatingsAndReviews', {
            _id,
            ratingCount,
            averageRating,
            url,
            payload,
          })
        }
      />

      {isRated ? (
        <View style={styles.ratingList}>
          {ratingData?.map((item, index) => (
            <RatingsReviewItem
              key={index}
              data={item}
              style={{ marginTop: index != 0 ? Metrics.ratio(18) : 0 }}
            />
          ))}
        </View>
      ) : (
        <EmptyViewCarousel
          message={strings('app.no_reivews_given_yet')}
          style={styles.emptyViewCarousel}
        />
      )}
    </>
  );
});

const QuantityBar = ({
  count,
  setCount,
  countInCart,
  inStockQuantity,
  inStock,
}) => {
  //const inStockQuantity = ProductUtil.getStockQuantityByAttr(attributeSelectd);
  const onIncrement = () => {
    const totalCount = countInCart + count;

    if (totalCount < inStockQuantity) {
      setCount?.(count + 1);
    } else {
      Util.showMessage(
        strings('app.quantity_exceed_cart_message', 'error', 6000)
      );
    }
  };
  const onDecrement = () => {
    if (count > 1) {
      setCount?.(count - 1);
    }
  };

  //const inStock = Number(inStockQuantity) > 0;
  const countToShow = inStock ? count : 0;

  return (
    <View style={styles.quantityBarContainer}>
      <Text type="semiBold" size="size_16" style={styles.quantityLabel}>
        {strings('app.quantity')}
      </Text>
      {inStock ? (
        <Text
          size="size_15"
          color="warmGrey"
          type="medium"
          style={AppStyles.flex1}
        >
          {`${inStockQuantity} ${strings('app.items_left')}`}
        </Text>
      ) : (
        <Text
          size="size_14"
          color="orangeRed"
          type="semiBold"
          style={AppStyles.flex1}
        >
          {strings('app.out_of_stock')}
        </Text>
      )}

      <QuantitySelector
        {...{
          onIncrement,
          onDecrement,
          count: countToShow,
          isDisabled: !inStock,
        }}
      />
    </View>
  );
};

export { TitlePriceRating, Title, RatingList, QuantityBar };
