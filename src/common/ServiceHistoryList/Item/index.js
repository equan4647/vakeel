import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { SERVICE_ITEM_TYPE, ID_TYPE } from '../../../config/Constants';
import { UserInfoAmount, ID, NameWithStatus } from '../..';
import { AppUtil, NavigationService } from '../../../utils';
import styles from './styles';
import { getServiceHistoryItem } from '../../../ducks/serviceHistory/selectors';
import { ServiceBookingUtil } from '../../../DataUtils';
import { requestAddServiceRating } from '../../../ducks/serviceHistory/actions';
import {
  API_ADD_SERVICE_REVIEW,
  API_UPDATE_SERVICE_REVIEW,
} from '../../../config/WebService';

const Item = props => {
  const { id } = props;

  const data = useSelector(getServiceHistoryItem(id));

  const serviceItem = data?.service_obj ?? {};

  const dispatch = useDispatch();

  const type = data.status;

  const isComplete = type === SERVICE_ITEM_TYPE.COMPLETED;
  const writeReview = isComplete && !ServiceBookingUtil.isReviewed(data);
  // const rating =
  //   isComplete && reviewd ? ServiceBookingUtil.getRating(data) : undefined;

  //   console.log(rating)

  const submitRating = values => {
    let payload;
    if (ServiceBookingUtil.isReviewed(data)) {
      payload = {
        id: ServiceBookingUtil.reviewId(data),
        rating: values.rating,
        review: values.description,
        service_id: ServiceBookingUtil.getServiceId(serviceItem),
        order_id: id,
      };
    } else {
      payload = {
        service_id: ServiceBookingUtil.getServiceId(serviceItem),
        rating: values.rating,
        review: values.description,
        order_id: id,
      };
    }

    const url = ServiceBookingUtil.isReviewed(data)
      ? API_UPDATE_SERVICE_REVIEW
      : API_ADD_SERVICE_REVIEW;

    dispatch(requestAddServiceRating(payload, url));
  };

  const onWriteReview = () => {
    NavigationService.navigate('Review', {
      submitRating,
      reviewData: ServiceBookingUtil.reviewData(data),
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        NavigationService.navigate('ServiceBookingDetails', {
          booking_id: id,
          // booking_details: data,
          type,
        });
      }}
      style={styles.main}
    >
      <ID
        // rating={ServiceBookingUtil.rating(data)}
        titleContainerStyle={{ flex: 1 }}
        id={ServiceBookingUtil.getId(data)}
        time={AppUtil.formatedBookingTime(data)}
        writeReview={writeReview}
        rating={ServiceBookingUtil.rating(data)}
        idType={ID_TYPE.SERVICE}
        data={data}
        onWriteReview={onWriteReview}
        showRating={ServiceBookingUtil.isReviewed(data)}
      />
      <NameWithStatus
        name={ServiceBookingUtil.title(data)}
        status={type}
        style={styles.nameContainer}
      />
      <UserInfoAmount
        source={ServiceBookingUtil.avatar(data)}
        username={ServiceBookingUtil.username(data)}
        price={ServiceBookingUtil.price(data)}
      />
    </TouchableOpacity>
  );
};

export default Item;
