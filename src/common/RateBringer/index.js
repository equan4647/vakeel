import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { TitleDescription, StarRating, WriteReviewButton } from '..';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { RATING_TYPE, STAR_SIZE } from '../../config/Constants';

const RateBringer = props => {
  const { isReviewed, onPressReviewButton, rating, style } = props,
    title = isReviewed ? 'you_rated' : 'you_havnt_rated_yet';

  const onPress = () => {
    if (onPressReviewButton) {
      onPressReviewButton();
    } else {
      NavigationService.navigate('Review', props.reviewScreenParams);
    }
  };

  return (
    <View {...{ style }}>
      <TitleDescription title={strings(`app.${title}`)} />
      <StarRating
        size={STAR_SIZE.XXLARGE}
        type={RATING_TYPE.RATING_WITHOUT_COUNT}
        {...{ rating }}
      />

      <WriteReviewButton
        style={styles.reviewbtn}
        isUpdate={isReviewed}
        {...{ onPress }}
      />
    </View>
  );
};

RateBringer.propTypes = {
  style: ViewPropTypes.style,
  isReviewed: PropTypes.bool,
  rating: PropTypes.number,
  onPressReviewButton: PropTypes.func,
  reviewScreenParams: PropTypes.object,
};
RateBringer.defaultProps = { isReviewed: false, rating: 0, style: {} };

export default RateBringer;
