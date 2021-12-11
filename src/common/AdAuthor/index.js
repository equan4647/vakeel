import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text } from '../../components';
import { Images } from '../../theme';
import styles from './styles';
import { UserView } from '..';

const AdAuthor = props => {
  const {
    onPress,
    title,
    hasRightArrow,
    containerStyle,
    data,
    rightView,
    onRatingPress,
    rating,
  } = props;
  const TagView = onPress ? ButtonView : View;
  return (
    <TagView style={[styles.container, containerStyle]} onPress={onPress}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.rightContainer}>
        <UserView {...{ data, rating, onRatingPress }} />
        {hasRightArrow && (
          <Image source={Images.icons.forwardArrow} style={styles.arrow} />
        )}
        {rightView ? rightView() : null}
      </View>
    </TagView>
  );
};

AdAuthor.propTypes = {
  containerStyle: ViewPropTypes.style,
  image: PropTypes.any,
  rightView: PropTypes.func,
  rating: PropTypes.bool,
  onPress: PropTypes.func,
  data: PropTypes.object.isRequired,
  hasRightArrow: PropTypes.bool,
};
AdAuthor.defaultProps = {
  containerStyle: {},
  rightView: undefined,
  rating: false,
  hasRightArrow: true,
};

export default AdAuthor;
