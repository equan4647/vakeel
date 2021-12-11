import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import ReadMore from '@fawazahmed/react-native-read-more';

import { StarRating } from '../../common';
import { ImageViewHttpRound, ReadMoreText, Text } from '../../components';
import { RATING_TYPE } from '../../config/Constants';
import { AppStyles } from '../../theme';
import styles from './styles';
import ReviewUtil from '../../DataUtils/ReviewUtil';
import { UserUtil } from '../../DataUtils';
import { strings } from '../../utils/i18n';

const TitleAndRating = props => {
  const { user } = props;

  return (
    <View style={styles.titleContainer}>
      <View style={AppStyles.spreadRowEnd}>
        <Text size="size_16" type="semiBold">
          {UserUtil.full_name(user)}
        </Text>

        <Text>{ReviewUtil.getUpdatedAt(props)}</Text>
      </View>

      <StarRating
        type={RATING_TYPE.RATING_WITHOUT_COUNT}
        rating={ReviewUtil.getRating(props)}
        style={styles.rating}
      />
    </View>
  );
};

const Header = props => {
  const user = ReviewUtil.getUserDetail(props);

  return (
    <View style={styles.headerContainer}>
      <ImageViewHttpRound url={UserUtil.avatar(user)} style={styles.avatar} />

      <TitleAndRating {...{ user }} {...props} />
    </View>
  );
};

const RatingsAndReviewItem = ({ data, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Header {...data} />
      <ReadMoreText text={ReviewUtil.getReview(data)} numberOfLines={3} />
    </View>
  );
};

RatingsAndReviewItem.propTypes = {
  data: PropTypes.object.isRequired,
  style: ViewPropTypes.style,
};
RatingsAndReviewItem.defaultProps = {
  data: {},
};

export default React.memo(RatingsAndReviewItem);
