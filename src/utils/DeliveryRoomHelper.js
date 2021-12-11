import dgram from 'react-native-udp';
import { Images } from '../theme';

const { NavigationService, Util, DataHandler } = require('.');
const {
  ORDER_STATUS,
  NOTIFICATION_IDENTIFIERS,
  MODULE,
} = require('../config/Constants');
const { DeliveryUtil } = require('../DataUtils');
const { deliverySelectors } = require('../ducks/delivery');
const {
  updateCurrentDelivery,
  requestCancelDeliveryOrder,
  requestAddDeliveryRating,
  resetCurrentDelivery,
} = require('../ducks/delivery/actions');
import { strings } from './i18n';

const UDP_SERVER_HOST = 'node.cubix.co',
  UDP_PORT = 4987,
  udp = dgram.createSocket('udp4');
// udp.bind(UDP_PORT);

function onpressCancelDelivery(status) {
  const { dispatch } = DataHandler.getStore();
  Util.showAlertConfirm(
    strings('messages.confirm_cancel_delivery'),
    '',
    strings('app.yes'),
    () =>
      dispatch(
        requestCancelDeliveryOrder({
          status: status ?? ORDER_STATUS.CANCELLED,
          id: DeliveryUtil.id(Util.getCurrentDelivery()),
        })
      )
  );
}

function displaySearchingBringer(wildCard = false) {
  if (
    wildCard ||
    ['ViewCurrentDelivery', 'DeliveryChat', 'AddDeliveryConfirmation'].includes(
      NavigationService.getCurrentRouteName()
    )
  ) {
    if (wildCard) {
      DataHandler.setNavigateToDeliveryMap();
    }
    Util.showBlurView({
      module: MODULE.DELIVERY,
      title: strings('app.searching_bringer'),
      text: strings('app.wait_message_bringer'),
      buttonTitle: strings('app.cancel_search'),
      requestFlag: 'PLACE_DELIVERY_ORDER',
      onPressButton: () =>
        onpressCancelDelivery(ORDER_STATUS.CANCELLED_BY_CUSTOMER),
    });
  }
}

function isMessageInDeliveryRoom(message) {
  const { getState } = DataHandler.getStore();
  const activeOrder = deliverySelectors.getActiveOrder(getState());
  return (
    message?.fields?.args[1]?.roomName ==
    DeliveryUtil.orderChatRoomName(activeOrder)
  );
}

function handleDeliveryRoom(message) {
  //fix required dispatch not found

  const { getState, dispatch } = DataHandler.getStore(),
    activeOrder = deliverySelectors.getActiveOrder(getState());

  const currentDelivery = JSON.parse(message?.fields?.args[0]?.msg);
  console.log('delivery object recvd', currentDelivery);
  switch (Util.getStatus(currentDelivery)) {
    case ORDER_STATUS.CANCELLED_DUE_TO_PAYMENT_ERROR:
      Util.hideBlurView(MODULE.DELIVERY);
      dispatch(resetCurrentDelivery(DeliveryUtil.id(currentDelivery)));

      if (Util.isRouteActive('AddDeliveryConfirmation')) {
        NavigationService.navigate('DeliveryHome');
      }
      Util.showMessage(strings('app.insufficient_amount'));
      break;

    case ORDER_STATUS.NO_DRIVER_FOUND:
      Util.hideBlurView(MODULE.DELIVERY);

      dispatch(resetCurrentDelivery(DeliveryUtil.id(currentDelivery)));

      if (Util.isRouteActive('ViewCurrentDelivery')) {
        NavigationService.navigate('DeliveryHome');
      }
      Util.showMessage(strings('app.no_driver_found'));
      break;

    case ORDER_STATUS.IN_PROGRESS:
      if (Util.getStatus(activeOrder) === ORDER_STATUS.PENDING) {
        Util.hideBlurView(MODULE.DELIVERY);
        if (DataHandler.getNavigateToDeliveryMap()) {
          NavigationService.navigate(
            'ViewCurrentDelivery',
            {},
            'AddDeliveryStack'
          );

          DataHandler.setNavigateToDeliveryMap(false);
        } else if (Util.isRouteActive('AddDeliveryConfirmation')) {
          NavigationService.reset('ViewCurrentDelivery');
        }
      }

      dispatch(
        updateCurrentDelivery(currentDelivery, {
          onGoingOrder: { isActive: true },
        })
      );
      break;

    case ORDER_STATUS.PENDING:
      displaySearchingBringer();

      dispatch(updateCurrentDelivery(currentDelivery));
      break;

    case ORDER_STATUS.DELIVERED:
      if (!Util.isRouteActive('ViewCurrentDelivery')) {
        dispatch(resetCurrentDelivery());
      }
      dispatch(updateCurrentDelivery(currentDelivery));
      break;

    default:
      break;
  }
}

function getDeliveryUpdate(info) {
  const status = Util.getStatus(info);
  const hasPicked = Util.pickupReached(info);
  // const hasDropped = DeliveryUtil.dropoffReached(info);
  let msg, distanceAndTime;

  switch (status) {
    case ORDER_STATUS.IN_PROGRESS:
      const {
        latitude: driverLat,
        longitude: driverLong,
      } = DeliveryUtil.driverLocation(info);

      const {
        latitude: pickupLat,
        longitude: pickupLong,
      } = DeliveryUtil.pickupLatLong(info);

      const {
        latitude: dropoffLat,
        longitude: dropoffLong,
      } = DeliveryUtil.dropoffLatLong(info);

      if (hasPicked) {
        msg = strings('messages.bringer_going_for_dropoff');
        let d = Util.getEstTimeDurationAndDist(
          driverLat,
          driverLong,
          dropoffLat,
          dropoffLong
        );
        distanceAndTime = `${d.time}${d.distance} away from dropoff point`;
      } else {
        msg = strings('messages.bringer_going_for_pickup');
        let d = Util.getEstTimeDurationAndDist(
          driverLat,
          driverLong,
          pickupLat,
          pickupLong
        );

        distanceAndTime = `${d.time}${d.distance} away from pickup point`;
      }
      break;

    case ORDER_STATUS.DELIVERED:
      showRatingModal();
      break;

    case ORDER_STATUS.PENDING:
      msg = strings('app.searching_bringer');
      break;

    default:
      msg = '';
      distanceAndTime = '';
      break;
  }

  return { msg, distanceAndTime };
}

function populateMap(info) {
  const markers = [
    {
      id: 'driver',
      latlong: DeliveryUtil.driverLocation(info, Util.isPlatformAndroid()),
      icon: { uri: DeliveryUtil.vehicleMarker(info) },
    },
    {
      id: 'pickup',
      latlong: DeliveryUtil.pickupLatLong(info),
      icon: Images.icons.locationPin,
    },
    {
      id: 'dropoff',
      latlong: DeliveryUtil.dropoffLatLong(info),
      icon: Images.icons.locationBlack,
    },
  ];

  const markerIDs = markers.map(({ id }) => id);

  return { markers, markerIDs };
}

function showRatingModal() {
  DataHandler.getCompletedModalRef().show({
    data: {
      userImage: DeliveryUtil.driverAvatar(Util.getCurrentDelivery()),
      name: DeliveryUtil.driverFullName(Util.getCurrentDelivery()),
      time: DeliveryUtil.updatedAt(Util.getCurrentDelivery()),
    },

    submitAction: requestAddDeliveryRating,
    title: strings('app.items_delivered'),

    onComplete: () => NavigationService.navigate('DeliveryHome'),

    requestFlag: 'ADD_DELIVERY_RATING',
    extraPayload: {
      driver_id: DeliveryUtil.driverID(Util.getCurrentDelivery()),
      order_id: DeliveryUtil.id(Util.getCurrentDelivery()),
    },
  });
}

//remove later
function updateDriverLocation() {
  const data = JSON.stringify({
    user_id: '6087be6011d444241c7daa30',
    latitude: 25.119627361491197,
    longitude: 66.72973123683306,
    presence: 1,
    'X-Access-Token': '43727509-1167-46de-85a4-af5348b90a3b',
    vehicle_type: 'Bike',
  });
  udp.send(data, 0, data.length, UDP_PORT, UDP_SERVER_HOST, function (err) {
    if (err) {
      alert('error', 'err');
    } else {
      alert('sucesss udp');
    }
    //if (err) throw err;
    //console.log('Message sent!');
  });
}

function viewOngoingDelivery(data) {
  if (Util.getStatus(data) === ORDER_STATUS.PENDING) {
    displaySearchingBringer(true);
  } else {
    NavigationService.navigate('ViewCurrentDelivery', {}, 'AddDeliveryStack');
  }
}

function isDeliveryModuleNotification(identifier) {
  const {
    DRIVER_CANCELLED,
    DRIVER_FOUND,
    ORDER_DELIVERED,
    DRIVER_ARRIVED,
  } = NOTIFICATION_IDENTIFIERS;
  return [
    DRIVER_CANCELLED,
    DRIVER_ARRIVED,
    DRIVER_FOUND,
    ORDER_DELIVERED,
  ].includes(identifier);
}

export {
  isDeliveryModuleNotification,
  updateDriverLocation, //remove later
  isMessageInDeliveryRoom,
  handleDeliveryRoom,
  getDeliveryUpdate,
  onpressCancelDelivery,
  displaySearchingBringer,
  populateMap,
  showRatingModal,
  viewOngoingDelivery,
};
