import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { WriteReviewButton, OrderStatusTag } from '..';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import { AppStyles } from '../../theme';
import styles from './styles';

const OrderID = ({ orderID, writeReview, time, title, status, rightView }) => {
  return (
    <View style={AppStyles.spreadRow}>
      <View>
        <Text style={styles.orderIdTextStyle}>{`${title} # ${orderID}`}</Text>
        <Text>{time}</Text>
      </View>
      {writeReview ? (
        <WriteReviewButton
          onPress={() => NavigationService.navigate('Review')}
        />
      ) : null}
      {status ? <OrderStatusTag status={status} /> : null}
      {rightView ? rightView() : null}
    </View>
  );
};

OrderID.propTypes = {
  orderID: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  writeReview: PropTypes.bool,
  title: PropTypes.string,
  rightView: PropTypes.func,
  status: PropTypes.string,
};
OrderID.defaultProps = {
  writeReview: false,
  title: strings('app.order'),
  rightView: undefined,
  status: '',
};

export default OrderID;
