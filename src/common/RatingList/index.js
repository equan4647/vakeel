import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { EmptyView, RatingsAndReviewItem, StarRating } from '../../common';
import styles from './styles';
import { FlatListApi, Text } from '../../components';
import { reviewsActions, reviewsSelectors } from '../../ducks/reviews';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { STAR_SIZE } from '../../config/Constants';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { resetReviews } from '../../ducks/reviews/actions';

const RatingList = props => {
  const {
    style,
    containerStyle,
    identifier,
    ratingCount,
    averageRating,
    url,
    ...rest
  } = props;

  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(resetReviews(identifier));
      // Anything in here is fired on component unmount.
    };
  }, []);

  const renderRatingHeader = () => {
    if (data?.length) {
      return (
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{Number(averageRating).toFixed(1)}</Text>
          <StarRating
            size={STAR_SIZE.MEDIUM}
            rating={averageRating}
            count={ratingCount}
          />
        </View>
      );
    } else {
      return null;
    }
  };

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`GET_REVIEWS_${identifier}`)
  );
  const data = useSelector(reviewsSelectors.getReviewData(identifier));
  // const payload = { item_id: identifier };

  return (
    <FlatListApi
      {...{ identifier, requestFlags, data }}
      requestAction={reviewsActions.requestGetReviews}
      ListHeaderComponent={renderRatingHeader}
      listStyle={style}
      url={url}
      contentContainerStyle={containerStyle}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <RatingsAndReviewItem data={item} />}
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="rating"
          text={strings('app.rating_empty_text')}
          imageStyle={AppStyles.emptyViewImage}
          containerStyle={AppStyles.emptyContainerStyle}
        />
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      {...rest}
    />
  );
};

RatingList.propTypes = {
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
};
RatingList.defaultProps = {};

export default RatingList;
