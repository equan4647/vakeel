import _ from 'lodash';
import { UserUtil } from '.';
import { AppUtil, Util } from '../utils';
import ChatHelper from '../ChatUtil/ChatHelper';
import { strings } from '../utils/i18n';

class DeliveryUtil {
  deliveryInfoDeliveryCharges = data =>
    data?.delivery_charges ? Number(data?.delivery_charges).toFixed(0) : 0;

  deliveryInfoDistInKM = data =>
    data?.rows?.[0]?.elements?.[0]?.distance?.value ?? '';

  deliveryInfoExpectedMins = data =>
    data?.rows?.[0]?.elements?.[0]?.duration?.text ?? '';

  deliveryInfoDropoff = data => data?.destination_addresses?.[0] ?? '';

  deliveryInfoPickup = data => data?.origin_addresses?.[0] ?? '';

  deliveryInfoPaymentMethod = data => data?.paymentMethod ?? {};

  orderRoomObj = orderData =>
    orderData?.rocket_chat_room_obj ??
    orderData?.delivery_info?.rocket_chat_room_obj ??
    {};

  orderChatRoomName = orderData => this.orderRoomObj(orderData)?.name ?? '';

  orderStatus = orderData => orderData?.status ?? '';

  id = orderData => orderData?._id ?? '';

  time = orderData => orderData?.time ?? '';

  isReviewed = orderData => !_.isEmpty(this.ratingObj(orderData));

  orderPickupAddress = orderData => orderData?.pickup_data?.address ?? '';

  cardInfo = orderData => orderData?.card_info ?? {};

  orderDropoffAddress = orderData => orderData?.dropoff_data?.address ?? '';

  distInKM = orderData => orderData?.distance_in_km ?? 0;

  dropoffLatLong = orderData => ({
    latitude: orderData?.dropoff_data?.lat,
    longitude: orderData.dropoff_data?.long,
  });

  pickupLatLong = orderData => ({
    latitude: orderData?.pickup_data?.lat,
    longitude: orderData.pickup_data?.long,
  });

  driverInfo = orderData => orderData?.driver_obj ?? {};

  driverLocation = (orderData, inNumber = false) => ({
    latitude: inNumber
      ? Number(orderData?.driver_location?.latitude)
      : orderData?.driver_location?.latitude,
    longitude: inNumber
      ? Number(orderData?.driver_location?.longitude)
      : orderData?.driver_location?.longitude,
  });

  driverAvatar = orderData => UserUtil.avatar(Util.driverInfo(orderData));

  driverID = orderData => UserUtil.id(Util.driverInfo(orderData));

  driverFullName = orderData => UserUtil.full_name(Util.driverInfo(orderData));

  driverRating = orderData => Util.driverInfo(orderData)?.avg_rating ?? 0;

  vehicleRegNum = orderData =>
    orderData?.driver_obj?.vehicle_reg_number ||
    orderData?.driver_obj?.vehicle_document_info?.registration_number ||
    '';

  packageDetail = orderData => orderData?.package_details ?? '';

  ratingObj = orderData => orderData?.driver_rating ?? {};

  ratingGiven = orderData => orderData?.driver_rating?.rating;

  vehicleTypeSelected = orderData => orderData?.vehicle_type_obj ?? {};

  vehicleIcon = orderData => this.vehicleTypeSelected(orderData)?.icon ?? '';

  vehicleMarker = orderData =>
    this.vehicleTypeSelected(orderData)?.mapMarker ?? '';

  amountToCharge = (orderData, format = false) => {
    const price = orderData?.amount_to_charge ?? 0;
    if (format) {
      return AppUtil.formatPrice(price);
    }
    return price;
  };

  amountPaid = orderData => AppUtil.formatPrice(orderData?.paid ?? 0);

  pickupReached = orderData => orderData?.pickup_reached == 1;

  dropoffReached = orderData => orderData?.drop_off_reached == 1;

  packageImages = orderData => orderData?.packageImages ?? [];

  isCardCharged = orderData => orderData?.card_charged;

  isWalletCharged = orderData => orderData?.wallet_charged;

  chatWithBringer = orderData => {
    const roomName = this.orderChatRoomName(orderData);
    ChatHelper.checkRoomAndNavigate(roomName, '', {}, false);
  };

  callWithBringer = orderData => {
    const info = Util.driverInfo(orderData);
    const dialCode = info?.dial_code ?? '';
    const phone = info?.phone ?? '';
    if (dialCode && phone) {
      const phoneNumber = `${dialCode}${phone}`;
      AppUtil.call(phoneNumber);
    } else {
      Util.showMessage(strings('app.phone_number_not_available'));
    }

    //console.log('call with bringer');
  };

  updatedAt = (orderData, format = true) => {
    if (format) {
      return AppUtil.getFormattedDate(orderData?.updated_at ?? '');
    } else {
      return orderData?.updated_at ?? '';
    }
  };

  formatDeliveryDate = () => {};
}
export default new DeliveryUtil();
