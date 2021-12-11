import React from 'react';
import { useSelector } from 'react-redux';

import { DeliveryItem, EmptyView, Separator } from '../../common';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { requestGetDeliveryHistory } from '../../ducks/deliveryHistory/actions';
import { FlatListApi } from '../../components';
import { ORDER_STATUS, USER_TYPES } from '../../config/Constants';

import styles from './styles';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import {
  getDeliveryHistoryItem,
  getDeliveryHistoryList,
} from '../../ducks/deliveryHistory/selectors';
import { AppStyles } from '../../theme';

const Item = ({ id }) => {
  const data = useSelector(getDeliveryHistoryItem(id));
  return <DeliveryItem {...{ data }} />;
};

const MyDeliveries = ({ navigation }) => {
  // set header
  NavigationService.setHeader(navigation, strings('app.deliveries'));

  const identifier = [
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.CANCELLED,
    ORDER_STATUS.IN_PROGRESS,
    ORDER_STATUS.PENDING,
  ];

  // useEffect(()=>{DeliveryRoomHelper.},[])

  const requestFlags = useSelector(getRequestFlag('GET_DELIVERY_HISTORY'));
  const data = useSelector(getDeliveryHistoryList);

  const payload = {
    status: identifier.join(','),
    user_type: USER_TYPES.BASIC,
    resturant_delivery: 0,
  };

  return (
    <FlatListApi
      {...{ requestFlags, payload, data }}
      requestAction={requestGetDeliveryHistory}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({ item }) => <Item id={item} />}
      ItemSeparatorComponent={() => <Separator />}
      keyExtractor={(_, index) => index.toString()}
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="deliveries"
          text={strings('app.deliveries_empty_text')}
          imageStyle={AppStyles.emptyViewImage}
          containerStyle={AppStyles.emptyContainerStyle}
        />
      }
    />
  );
};

export default MyDeliveries;
