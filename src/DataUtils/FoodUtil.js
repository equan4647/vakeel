import _ from 'lodash';
import { DeliveryUtil, UserUtil } from '.';
import { ChatHelper } from '../ChatUtil';
import { Colors } from '../theme';
import { AppUtil, Util } from '../utils';

function getFiltersInfoFood(filters) {
  console.log('filters', filters);
  // get sort object

  // const cost_level = filters?.price ? filters?.price.map((item)=> item.key.join)

  const cuisines = filters?.cusines ? filters.cusines.join() : '',
    rating_limit = filters?.rating ?? undefined,
    cost_level = filters?.price ? filters.price.join() : '';

  const filtersPayload = { cuisine_ids: cuisines };
  let filterCount = 0;

  if (Util.isNotEmpty(cuisines)) {
    filterCount += 1;
  }
  if (rating_limit) {
    filterCount += 1;
    filtersPayload.avg_rating = rating_limit;
  }
  if (cost_level) {
    filterCount += 1;
    filtersPayload.cost_level = cost_level;
  }
  return { filtersPayload, filterCount };
}

function getIcon(data) {
  return data?.icon ?? '';
}

function getRestaurantName(data) {
  return data?.name ?? data?.resturant_name ?? '';
}

function isLiked(data) {
  return data?.is_liked == 1;
}

function costLevel(data) {
  return data?.cost_level ?? 0;
}

function avgRating(data) {
  return data?.avg_rating ?? 0;
}

function ratingCount(data) {
  return data?.rating_count ?? 0;
}

function estTime(data, format = true) {
  return data?.estimatedDeliveryTime && format
    ? Util.minToHoursAndMins(data?.estimatedDeliveryTime)
    : data?.estimatedDeliveryTime;
}

function cuisinesAssociated(data) {
  return data?.cuisine?.length > 0 ? data?.cuisine?.slice(0, 3) : [];
}

function deliveryInfo(data) {
  return data?.delivery_info ?? {};
}

function driverObjectFromInfo(data) {
  return data?.delivery_info?.driver_obj ?? {};
}

function driverObject(data) {
  return data?.driver_obj ?? data?.delivery_info?.driver_obj ?? {};
}

function driverLocation(data) {
  const _driverLocation =
      data?.driver_location ?? data?.delivery_info?.driver_location ?? {},
    { latitude = '', longitude = '' } = _driverLocation;
  return { latitude, longitude };
}

function pickupReached(data) {
  return data?.delivery_info
    ? Util.pickupReached(data?.delivery_info)
    : Util.pickupReached(data);
}

function mapCuisines(data) {
  return data?.items?.length > 0
    ? _(data.items)
        .groupBy(x => x.cuisine_id)
        .map((value, key) => ({
          name: value?.[0]?.cuisine_name,
          items: value,
          id: key,
        }))
        .value()
    : [];
}

function getDollarColor(data, item) {
  return costLevel(data) > 0 && costLevel(data) > item
    ? Colors.black
    : Colors.blackO27;
}

function getID(data) {
  return data?.order_id ? data?.order_id : data?._id;
}

function CuisineTitle(data) {
  return data?.name ?? '';
}

function foodItemTitle(foodItem) {
  return foodItem?.title ?? '';
}

function foodItemDescription(foodItem) {
  return foodItem?.description ?? '';
}

function foodItemPrice(item, format = true) {
  const price = item?.price ?? '';
  return format ? AppUtil.formatPrice(price) : Number(price).toFixed(2);
}

function foodItemQuantity(foodItem) {
  return foodItem?.quantity ?? '';
}

function foodItemImage(foodItem) {
  return foodItem?.image ?? '';
}

function getRestaurantID(foodItem) {
  return foodItem?.resturant_id ?? '';
}

function getRestaurantOrderID(data) {
  return data?.resturant_order_id ?? '';
}

function foodItemID(foodItem) {
  return foodItem?._id ?? '';
}

function getCuisineID(data) {
  return data?.cuisine_id ?? '';
}

function getCuisineName(data) {
  return data?.cuisine_name ?? '';
}

function calculateTotal(data) {
  return data?.reduce(
    (acc, item) =>
      Number(foodItemQuantity(item)) * Number(foodItemPrice(item, false)) + acc,
    0
  );
}

function isDeliveryEnabled(data) {
  return data?.driver_enabled == 1;
}

function getRestaurantLocation(data) {
  return data?.location_address ?? '';
}

function getDropOffData(orderData) {
  return orderData?.dropoff_data ?? {};
}

function getCardInfo(orderData) {
  return orderData?.card_info ?? {};
}

function isBringerEnabled(data) {
  return data?.bringer_enabled == 1;
}

function foodOrderDateCreated(data, format = true) {
  if (data?.created_at) {
    return format ? Util.getFullDateTime(data?.created_at) : data?.created_at;
  }
  return '';
}

function foodOrderDateUpdated(data, format = true) {
  if (data?.updated_at) {
    return format ? Util.getFullDateTime(data?.updated_at) : data?.updated_at;
  }
  return '';
}

function getItemsCount(data) {
  return data?.reduce((acc, item) => Number(foodItemQuantity(item)) + acc, 0);
}

function foodItems(data) {
  return data?.items ?? [];
}

function subTotal(data, format = false) {
  const price = data?.subtotal ?? '';
  return format
    ? AppUtil.formatPrice(price)
    : Util.toFixedIfNecessary(price, 2);
}

function amountToCharge(data, format = false) {
  const price = data?.amount_to_charge ?? '';
  return format
    ? AppUtil.formatPrice(price)
    : Util.toFixedIfNecessary(price, 2);
}

function deliveryCharges(data, format = false) {
  const price = data?.delivery_charges ?? '';
  return format
    ? AppUtil.formatPrice(price)
    : Util.toFixedIfNecessary(price, 2);
}

function getItemImage(item) {
  return item?.image ?? '';
}

function chatWithBringer(orderData) {
  const roomName = Util.isNotEmpty(orderData?.rocket_chat_room_obj)
    ? orderData?.rocket_chat_room_obj?.name
    : orderData?.delivery_info?.rocket_chat_room_obj?.name;
  ChatHelper.checkRoomAndNavigate(
    roomName,
    UserUtil.full_name(driverObject(orderData)),
    {},
    false
  );
}

function getRestaurantLocationObject(data) {
  return {
    address: getRestaurantLocation(data),
    lat: data?.lat ?? 0,
    long: data?.long ?? 0,
  };
}

function orderStatus(orderData) {
  return orderData?.status ?? '';
}

function getDistanceAndTime(data, getObject = false, getSecs) {
  const hasPicked = pickupReached(data),
    _driverLocation = driverLocation(data),
    destination = hasPicked
      ? DeliveryUtil.dropoffLatLong(data)
      : DeliveryUtil.pickupLatLong(data);

  const { distance, time } = Util.getEstTimeDurationAndDist(
    destination.latitude,
    destination.longitude,
    _driverLocation.latitude,
    _driverLocation.longitude,
    getSecs
  );

  return getObject
    ? { time, distance }
    : `${time}${distance} away from ${hasPicked ? 'dropoff' : 'pickup'} point`;
}

function getContact(data) {
  return data?.contact ?? '';
}

export default {
  getContact,
  getRestaurantOrderID,
  getDistanceAndTime,
  subTotal,
  orderStatus,
  getRestaurantLocationObject,
  getRestaurantLocation,
  isDeliveryEnabled,
  calculateTotal,
  foodItemQuantity,
  getID,
  getRestaurantID,
  foodItemID,
  foodItemDescription,
  foodItemImage,
  foodItemPrice,
  CuisineTitle,
  foodItemTitle,
  getFiltersInfoFood,
  getIcon,
  getRestaurantName,
  isLiked,
  costLevel,
  estTime,
  avgRating,
  ratingCount,
  cuisinesAssociated,
  mapCuisines,
  getDollarColor,
  foodOrderDateCreated,
  foodOrderDateUpdated,
  getItemsCount,
  foodItems,
  amountToCharge,
  deliveryCharges,
  getItemImage,
  getCuisineID,
  getCuisineName,
  getDropOffData,
  isBringerEnabled,
  getCardInfo,
  deliveryInfo,
  driverObjectFromInfo,
  driverObject,
  chatWithBringer,
  driverLocation,
  pickupReached,
};
