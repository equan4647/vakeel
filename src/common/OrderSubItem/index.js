import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { ImageViewHttp, Loader, Text } from '../../components';
import { AppStyles, Metrics } from '../../theme';
import styles from './styles';
import { BuyingCartUtil, OrderUtil, ProductUtil } from '../../DataUtils';
import { WriteReviewButton } from '..';
import { NavigationService } from '../../utils';
import {
  API_ADD_PRODUCT_REVIEW,
  API_UPDATE_PRODUCT_REVIEW,
} from '../../config/WebService';
import { useDispatch } from 'react-redux';
import ReviewUtil from '../../DataUtils/ReviewUtil';
import { requestAddReview } from '../../ducks/reviews/actions';

const Detail = ({ data }) => {
  const isDiscounted = ProductUtil.isDiscounted(data.item_detail);

  const price = isDiscounted
    ? BuyingCartUtil.getProductDiscountedPrice(data)
    : BuyingCartUtil.getProductPrice(data);

  return (
    <View style={styles.detailContainer}>
      <Text>{BuyingCartUtil.getTitle(data)}</Text>

      <Text style={styles.priceTextStyle}>{price}</Text>

      <Text>{BuyingCartUtil.getQuantity(data)}x</Text>
    </View>
  );
};

const OrderSubItem = ({ data, style, orderID, allowReview }) => {
  const dispatch = useDispatch();

  const submitRating = values => {
    const payload = {
      item_id: OrderUtil.getAttrId(data),
      rating: values.rating,
      review: values.description,
      order_id: orderID,
      product_id: OrderUtil.getProductId(data),
    };

    if (OrderUtil.isRated(data)) {
      payload.id = ReviewUtil.getId(OrderUtil.getRating(data));
    }

    const url = OrderUtil.isRated(data)
      ? API_UPDATE_PRODUCT_REVIEW
      : API_ADD_PRODUCT_REVIEW;

    dispatch(requestAddReview(payload, url));
  };

  const navigateToReview = () =>
    NavigationService.navigate('Review', {
      submitRating,
      reviewData: OrderUtil.getRating(data),
    });

  return (
    <View style={[AppStyles.row, style]}>
      <ImageViewHttp
        url={BuyingCartUtil.getProductImageByAttr(data)}
        style={styles.imageStyle}
        borderRadius={Metrics.ratio(12)}
        placeholderStyle={styles.imgPlaceholderStyle}
      />

      <View style={styles.spreadRow}>
        <Detail {...{ data }} />

        {allowReview ? (
          <WriteReviewButton
            onPress={navigateToReview}
            isUpdate={OrderUtil.isRated(data)}
          />
        ) : null}
      </View>
      <Loader type="ADD_REVIEW" />
    </View>
  );
};
OrderSubItem.propTypes = {
  data: PropTypes.object,
  style: ViewPropTypes.style,
  orderID: PropTypes.string,
  allowReview: PropTypes.bool,
};

OrderSubItem.defaultProps = {
  orderID: '',
  allowReview: false,
};

export default OrderSubItem;
