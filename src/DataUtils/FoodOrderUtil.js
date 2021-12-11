import { foodOrdersSelectors } from '../ducks/foodOrders';
import { useSelector } from 'react-redux';
import { FoodUtil } from '.';
import { Util } from '../utils';
import { strings } from '../utils/i18n';
import moment from 'moment';
import DeliveryUtil from './DeliveryUtil';

function isRated(data) {
  return data?.is_rated == 1;
}

function getRatingData(data) {
  return data?.rating_obj ?? {};
}

function getRating(data) {
  return data?.rating_obj?.rating ?? 0;
}

function getResturantName(data) {
  return data?.resturant_name ?? '';
}

function getBringerTime(data) {
  return (
    data?.bringerDeliveryTime ??
    data?.delivery_info?.bringerDeliveryTime ??
    'less than 5 min'
  );
}

function pickupReached(data) {
  return Util.isEmpty(FoodUtil.deliveryInfo(data))
    ? Util.pickupReached(data)
    : Util.pickupReached(FoodUtil.deliveryInfo(data));
}

function getResturantDeliveryTime(data) {
  return data?.resturantDeliveryTime ?? '5 min';
}

function getProgressText(data) {
  if (!FoodUtil.isBringerEnabled(data)) {
    return strings('app.your_food_order_in_progress');
  } else if (Util.isStatusDelivered(data)) {
    return strings('app.order_delivered');
  } else if (Util.isStatusCancelled(data)) {
    return strings('app.cancelled');
  } else {
    return pickupReached(data)
      ? strings('app.food_on_his_way')
      : strings('app.preparing_your_food');
  }
}

function getStep(data) {
  if (FoodUtil.isBringerEnabled(data)) {
    if (Util.isStatusDelivered(data)) {
      return 3;
    } else {
      return pickupReached(data) ? 2 : 1;
    }
  } else {
    return -1;
  }
}

function getProgressTime(data) {
  const getMinutesDigit = minuteString => minuteString.trim().split(' ')[0],
    getMinutesFromSecs = sec => moment.duration(sec, 'seconds').asMinutes(),
    formatWithMinutesStr = timeStr =>
      timeStr > 5 ? `${Math.floor(timeStr)} mins` : '< 5 mins';

  const driverTime = getMinutesFromSecs(
    FoodUtil.getDistanceAndTime(data, true, true)?.time
  );

  const getDropOffTime = () => {
    const _driverLocation = FoodUtil.driverLocation(data),
      destination = DeliveryUtil.dropoffLatLong(data);

    const { time: dropOffTime } = Util.getEstTimeDurationAndDist(
      destination.latitude,
      destination.longitude,
      _driverLocation.latitude,
      _driverLocation.longitude,
      true
    );

    return getMinutesFromSecs(dropOffTime, 'seconds');
  };

  const driverPlusResturantTime = () => {
    if (FoodUtil.isBringerEnabled(data)) {
      console.log('yahan agya');
      const totalTime =
        +getMinutesDigit(getResturantDeliveryTime(data)) + getDropOffTime();

      return formatWithMinutesStr(totalTime);
    } else {
      return formatWithMinutesStr(
        getMinutesDigit(getResturantDeliveryTime(data))
      );
    }
  };

  if (Util.isStatusDelivered(data)) {
    return null;
  } else {
    return pickupReached(data)
      ? formatWithMinutesStr(driverTime)
      : driverPlusResturantTime();
  }
}

function useFoodOrderStepperInfo(_data) {
  const activeFoodOrder = useSelector(foodOrdersSelectors.getOrderInProgress),
    data = _data ?? activeFoodOrder;

  return {
    title: getResturantName(data),
    info: getProgressText(data),
    time: getProgressTime(data),
    activeStep: getStep(data),
  };
}

function useActiveOrderStatus(_data) {
  const activeFoodOrder = useSelector(foodOrdersSelectors.getOrderInProgress),
    isActiveOrderPendingOrInProgress =
      Util.isNotEmpty(activeFoodOrder) &&
      (Util.isStatusPending(activeFoodOrder) ||
        Util.isStatusInProgress(activeFoodOrder));

  return { isActiveOrderPendingOrInProgress };
}

function getDeliveryCharges(data) {
  return data?.charges?.deliveryCharges ?? '';
}

function getSubTotal(data) {
  return data?.charges?.subTotal ?? '';
}

function getDeliveryTotal(data) {
  return data?.charges?.total ?? '';
}

export default useFoodOrderStepperInfo;
export {
  getDeliveryCharges,
  getSubTotal,
  getDeliveryTotal,
  getResturantName,
  getProgressText,
  useActiveOrderStatus,
  isRated,
  getRatingData,
  getRating,
};
