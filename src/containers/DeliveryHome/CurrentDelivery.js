import { View } from 'react-native';
import React, { useEffect } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';

import { DeliveryItem, AppButton } from '../../common';
import { DeliveryRoomHelper, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import { deliverySelectors } from '../../ducks/delivery';
import AddDelivery from './AddDelivery';
import { DeliveryUtil } from '../../DataUtils';
import { ORDER_STATUS } from '../../config/Constants';

const CurrentDelivery = () => {
  const data = useSelector(deliverySelectors.getActiveOrder),
    isOrderDelivered = Util.getStatus(data) === ORDER_STATUS.DELIVERED,
    onPress = () => DeliveryRoomHelper.viewOngoingDelivery(data);

  useEffect(() => {
    if (isOrderDelivered && !DeliveryUtil.isReviewed(data)) {
      DeliveryRoomHelper.showRatingModal();
    }
  }, [data]);

  if (_.isEmpty(data) || isOrderDelivered) {
    return <AddDelivery />;
  }

  return (
    <View style={AppStyles.container}>
      <DeliveryItem {...{ data }} style={styles.vehicleItem} isDetail />

      <AppButton title={strings('app.view_delivery')} {...{ onPress }} />
    </View>
  );
};

CurrentDelivery.propTypes = {};
CurrentDelivery.defaultProps = {};

export default CurrentDelivery;
