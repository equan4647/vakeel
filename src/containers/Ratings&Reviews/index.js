import React from 'react';

import { RatingList } from '../../common';
import { API_PRODUCT_REVIEWS } from '../../config/WebService';
import { strings } from '../../utils/i18n';

const RatingsAndReviews = ({ navigation, route }) => {
  const _id = route.params?._id ?? '',
    ratingCount = route.params?.ratingCount ?? 0,
    averageRating = route.params?.averageRating ?? 0,
    url = route.params?.url ?? API_PRODUCT_REVIEWS,
    payload = route.params?.payload ?? {};

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: strings('app.rating_and_reviews') });
  }, [navigation]);

  return (
    <RatingList
      identifier={_id}
      {...{ ratingCount, averageRating, url, payload }}
    />
  );
};
export default RatingsAndReviews;
