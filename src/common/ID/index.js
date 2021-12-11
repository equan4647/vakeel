import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { WriteReviewButton, OrderStatusTag, StarRating } from '..';
import { ID_TYPE, RATING_TYPE } from '../../config/Constants';

import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import { AppStyles } from '../../theme';
import styles from './styles';

const getIdTitle = idType => {
  switch (idType) {
    case ID_TYPE.ORDER:
      return strings('app.order');
    case ID_TYPE.CONSULTANCY:
      return strings('app.consultancy');
    case ID_TYPE.SERVICE:
      return strings('app.service');
    case ID_TYPE.DELIVERY:
      return strings('app.delivery');
    default:
      return '';
  }
};

const ID = ({
  id,
  writeReview,
  time,
  idType,
  status,
  rating,
  style,
  data,
  onWriteReview,
  showRating,
  reviewButtonProps,
  titleContainerStyle,
}) => {
  return (
    <View style={[AppStyles.spreadRow, style]}>
      <View style={titleContainerStyle}>
        <Text numberOfLines={1} style={styles.idText}>{`${getIdTitle(
          idType
        )} #${id}`}</Text>
        {time ? <Text>{time}</Text> : null}
      </View>

      {status ? <OrderStatusTag status={status} /> : null}

      {showRating ? (
        <StarRating
          style={styles.marginLeftMedium}
          rating={rating}
          type={RATING_TYPE.RATING_WITHOUT_COUNT}
        />
      ) : null}

      {writeReview ? (
        <WriteReviewButton
          style={styles.marginLeftMedium}
          onPress={onWriteReview}
          {...reviewButtonProps}
        />
      ) : null}
    </View>
  );
};

ID.propTypes = {
  style: ViewPropTypes.style,
  idType: PropTypes.oneOf(Object.values(ID_TYPE)),
  time: PropTypes.string,
  writeReview: PropTypes.bool,
  rating: PropTypes.any,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  status: PropTypes.string,
  reviewButtonProps: PropTypes.object,
  onWriteReview: PropTypes.func,
};
ID.defaultProps = {
  style: {},
  idType: ID_TYPE.ORDER,
  writeReview: false,
  time: '',
  rating: undefined,
  status: '',
};

export default React.memo(ID);
