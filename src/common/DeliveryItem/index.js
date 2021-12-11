import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import {
  ID,
  PickAndDropLocation,
  VehicleItem,
  UserInfoAmount,
} from '../../common';
import { ORDER_STATUS, ID_TYPE } from '../../config/Constants';
import { NavigationService, Util } from '../../utils';
import { ButtonView } from '../../components';
import styles from './styles';
import { DeliveryUtil } from '../../DataUtils';

const DeliveryItem = ({ data, style, isDetail }) => {
  const status = Util.getStatus(data),
    isComplete = status === ORDER_STATUS.COMPLETED,
    writeReview = isComplete && !(data?.reviewd ?? false),
    TagView = isDetail ? View : ButtonView,
    id = DeliveryUtil.id(data);

  return (
    <TagView
      style={[styles.container, style]}
      onPress={() => NavigationService.navigate('DeliveryDetails', { id })}
    >
      <ID
        id={DeliveryUtil.id(data)}
        time={Util.getFullDateTime(DeliveryUtil.updatedAt(data, false))}
        writeReview={writeReview}
        rating={data?.rating ?? undefined}
        idType={ID_TYPE.DELIVERY}
      />

      <PickAndDropLocation
        pickAddress={DeliveryUtil.orderPickupAddress(data)}
        dropAddress={DeliveryUtil.orderDropoffAddress(data)}
        viewableOnly
        style={styles.pickAndDropOffLocation}
        {...{ status }}
      />

      <VehicleItem
        data={DeliveryUtil.vehicleTypeSelected(data)}
        vehicleNumber={DeliveryUtil.vehicleRegNum(data)}
        style={styles.vehicleItem}
        isSmall
      />

      {status === ORDER_STATUS.PENDING ? null : (
        <UserInfoAmount
          source={DeliveryUtil.driverAvatar(data)}
          username={DeliveryUtil.driverFullName(data)}
          price={DeliveryUtil.amountToCharge(data)}
        />
      )}
    </TagView>
  );
};

DeliveryItem.propTypes = {
  data: PropTypes.object.isRequired,
  isDetail: PropTypes.bool,
  style: ViewPropTypes.style,
};
DeliveryItem.defaultProps = { style: {}, isDetail: false };

export default DeliveryItem;
