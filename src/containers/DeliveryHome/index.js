import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { NavigationService } from '../../utils';
import CurrentDelivery from './CurrentDelivery';
import AddDelivery from './AddDelivery';
import { ScrollViewApi } from '../../components';
import { deliveryActions, deliverySelectors } from '../../ducks/delivery';
import { ORDER_STATUS, USER_TYPES } from '../../config/Constants';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { AppStyles } from '../../theme';
import { networkSelectors } from '../../ducks/network';
import { resetCurrentDelivery } from '../../ducks/delivery/actions';
import { useUserRole } from '../../utils/CustomHooks';

const DeliveryHome = ({ navigation, route }) => {
  // set header
  NavigationService.setHeader(navigation, '');

  const isGuest = useUserRole();
  const [isFirstTime, setIsFirstTime] = React.useState(true);

  const payload = {
    status: `${ORDER_STATUS.PENDING},${ORDER_STATUS.IN_PROGRESS},${ORDER_STATUS.DELIVERED}`,
    user_type: USER_TYPES.BASIC,
    resturant_delivery: 0,
  };

  const requestFlags = useSelector(getRequestFlag('GET_ONGOING_ORDER')),
    data = useSelector(deliverySelectors.getOngoingDelivery),
    isNetworkConnected = useSelector(networkSelectors.getNetworkInfo),
    dispatch = useDispatch();

  useEffect(() => {
    if (isNetworkConnected && !isGuest) {
      if (isFirstTime) {
        setIsFirstTime(false);
      } else {
        dispatch(deliveryActions.requestOngoingOrder(payload));
      }
    }
    return () => {
      if (!isGuest) {
        dispatch(resetCurrentDelivery());
      }
    };
  }, [isNetworkConnected, dispatch]);

  if (isGuest) {
    return <AddDelivery />;
  }

  return (
    <ScrollViewApi
      {...{ data, payload, requestFlags }}
      contentContainerStyle={AppStyles.flex1}
      requestAction={deliveryActions.requestOngoingOrder}
      content={() => <CurrentDelivery />}
      emptyView={() => <AddDelivery />}
    />
  );
};

export default DeliveryHome;
