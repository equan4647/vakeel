import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import PropTypes from 'prop-types';

import { Text } from '../../components';
import { AppStyles, Colors } from '../../theme';
import styles from './styles';
import { RATING_TYPE, STAR_SIZE } from '../../config/Constants';

const Rating = ({ rating, type, count, onPress, size, showRating }) => {
  const isDisabled = [
    RATING_TYPE.RATING_WITH_COUNT,
    RATING_TYPE.RATING_WITHOUT_COUNT,
  ].includes(type);
  return (
    <View style={AppStyles.rowAligned}>
      <View style={[styles.starContainer]}>
        <AirbnbRating
          count={5}
          showRating={false}
          defaultRating={rating}
          {...{ size, isDisabled }}
          starStyle={styles.starStyle}
          onFinishRating={onPress}
          selectedColor={Colors.goldenYellow}
        />
      </View>

      {type === RATING_TYPE.RATING_WITH_COUNT ? (
        <View style={AppStyles.row}>
          {showRating && (
            <Text style={styles.countText} size={`size_${size}`}>
              {rating}
            </Text>
          )}
          <Text style={styles.countText} size={`size_${size}`}>
            ({count})
          </Text>
        </View>
      ) : null}
      {type === RATING_TYPE.RATING_INPUT_WITH_TEXT && rating > 0 ? (
        <Text style={styles.upto}>{`Upto ${rating}`}</Text>
      ) : null}
    </View>
  );
};

const StarRating = props => {
  const { title, type, style, titleStyle } = props;
  return (
    <View {...{ style }}>
      {title || type === RATING_TYPE.RATING_INPUT ? (
        <Text style={[styles.titleTextStyle, titleStyle]}>{title}</Text>
      ) : null}
      <Rating {...props} />
    </View>
  );
};

StarRating.propTypes = {
  title: PropTypes.string,
  style: ViewPropTypes.style,
  titleStyle: PropTypes.object,
  rating: PropTypes.number,
  type: PropTypes.oneOf(Object.values(RATING_TYPE)),
  count: PropTypes.number,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(Object.values(STAR_SIZE)).isRequired,
};
StarRating.defaultProps = {
  type: RATING_TYPE.RATING_WITH_COUNT,
  size: STAR_SIZE.SMALL,
  rating: 0,
};

export default StarRating;
