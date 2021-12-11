import { View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { PickAndDropLocation, OpaqueBack } from '../../../common';
import styles from './styles';
import { deliverySelectors } from '../../../ducks/delivery';
import { DeliveryUtil } from '../../../DataUtils';

const FixHeader = () => {
  const currentDelivery = useSelector(deliverySelectors.getActiveOrder);

  return (
    <View style={styles.header}>
      <OpaqueBack isWhite />

      <PickAndDropLocation
        pickAddress={DeliveryUtil.orderPickupAddress(currentDelivery)}
        dropAddress={DeliveryUtil.orderDropoffAddress(currentDelivery)}
        viewableOnly
        style={styles.pickupAndDropOff}
        showSeparator
      />
    </View>
  );
};

FixHeader.propTypes = {};
FixHeader.defaultProps = {};

export default React.memo(FixHeader);
