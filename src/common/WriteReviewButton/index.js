import React from 'react';
import PropTypes from 'prop-types';

import { Image, Text, ButtonView } from '../../components';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { ViewPropTypes } from 'react-native';

const WriteReviewButton = ({ style, onPress, isUpdate }) => (
  <ButtonView style={[AppStyles.row, style]} onPress={onPress}>
    <Image source={Images.icons.writeReview} />

    <Text style={styles.writeReviewTextStyle}>
      {isUpdate ? strings('app.update_review') : strings('app.write_review')}
    </Text>
  </ButtonView>
);

WriteReviewButton.propTypes = {
  onPress: PropTypes.func,
  isUpdate: PropTypes.bool,
  style: ViewPropTypes.style,
};
WriteReviewButton.defaultProps = {
  isUpdate: false,
};
export default WriteReviewButton;
