import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {
  DeliveryRoomHelper,
  NavigationService,
  RestaurantDeliveryHelper,
  Util,
} from '.';
import ChatHelper from '../ChatUtil/ChatHelper';
import { NOTIFICATION_IDENTIFIERS } from '../config/Constants';
import { ClassifiedUtil, ProductUtil, ServicesUtil } from '../DataUtils';

class FirebaseUtils {
  unsubscribe;

  getPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    const enabled =
      authorizationStatus !== messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus !== messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
  };

  getRoomNameFromPayload = payload => {
    try {
      const payloadObject = JSON.parse(payload);
      const roomName = payloadObject?.name ?? '';
      return roomName;
    } catch (error) {
      return '';
    }
  };

  isMessageInSameRoom = payload => {
    const roomName = this.getRoomNameFromPayload(payload);

    const currentChatRoom = ChatHelper.getCurrentChatroom();
    const isCurrentRoom =
      currentChatRoom &&
      currentChatRoom.fname &&
      currentChatRoom.fname === roomName
        ? true
        : false;
    return isCurrentRoom;
  };

  handleLocalNotificationChat = (data, notification) => {
    try {
      const isNotificationInCurrentRoom = this.isMessageInSameRoom(
        data?.payload
      );
      if (!isNotificationInCurrentRoom) {
        this.showLocalNotification(notification.title, notification.body, data);
      }
    } catch (error) {
      //return '';
    }
  };

  getTokenPromise = async () => {
    return new Promise((resolve, reject) => {
      messaging()
        .getToken()
        .then(token => {
          resolve(token);
        })
        .catch(() => {
          resolve('');
        });
    });
  };

  createChannel = () => {
    PushNotification.channelExists('bizad', exists => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: 'bizad', // (required)
            channelName: 'default channel', // (required)
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          created => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
      }
    });
  };

  setBadge(val = 0) {
    if (Util.isPlatformAndroid()) {
      PushNotification.setApplicationIconBadgeNumber(val);
    } else {
      PushNotificationIOS.setApplicationIconBadgeNumber(val);
    }
  }

  showLocalNotification = (title, message, userInfo) =>
    PushNotification.localNotification({
      channelId: 'bizad',
      autoCancel: true,
      largeIcon: '',
      vibrate: true,
      vibration: 300,
      priority: 'high',
      ignoreInForeground: false,
      onlyAlertOnce: false,
      title,
      message,
      playSound: false,
      soundName: 'default',
      invokeApp: true,
      userInfo,
    });

  handleNotificationChat = payload => {
    const isMessageInSameRoom = this.isMessageInSameRoom(payload);

    if (!isMessageInSameRoom) {
      try {
        const payloadObject = JSON.parse(payload);

        const roomName = payloadObject?.name ?? '';
        const rid = payloadObject?.rid ?? '';
        const memberInfo = payloadObject?.sender ?? {};

        const roomInfo = { fname: roomName, rid, members: [memberInfo] };

        setTimeout(() => {
          NavigationService.navigate('Chat', { room: roomInfo });
        }, 200);
      } catch (error) {
        //console.log('Erorr comes in pasring', error);
      }

      //const roomName = this.getRoomNameFromPayload(payload);
    }
  };

  handleNotification = ({ data }) => {
    if (data.payload) {
      this.handleNotificationChat(data.payload);
    } else if (
      DeliveryRoomHelper.isDeliveryModuleNotification(data.identifier)
    ) {
      this.navigate('Delivery', {});
    } else if (
      RestaurantDeliveryHelper.isRestaurantDeliveryNotification(data.identifier)
    ) {
      this.navigate('Food', {});
    } else if (
      RestaurantDeliveryHelper.isRestaurantNotification(data.identifier)
    ) {
      this.navigate('FoodOrderDetail', { id: data.reference_id });
    } else if (ProductUtil.isMarketPlaceOrderNotification(data.identifier)) {
      this.navigate('OrderDetail', {
        id: data.reference_id,
      });
    } else if (ProductUtil.isMarketPlaceNotification(data.identifier)) {
      this.navigate('ViewBuyingProduct', {
        item: data.reference_id,
      });
    } else if (ServicesUtil.isServiceNotification(data.identifier)) {
      this.navigate('ServiceBookingDetails', {
        booking_id: data.reference_id,
      });
    } else if (ClassifiedUtil.isClassifiedNotification(data.identifier)) {
      this.navigate('ClassifiedDetail', {
        classifiedId: data.reference_id,
      });
    } else if (
      data.identifier === NOTIFICATION_IDENTIFIERS.INVITE_CODE_ACCEPTED
    ) {
      this.navigate('PaymentMethod', { fromMenu: true }, 'PaymentMethodStack');
    } else if (
      data.identifier === NOTIFICATION_IDENTIFIERS.ADVERTISMENT_EXPIRY
    ) {
      this.navigate('AdvertismentDetail', {
        id: data.reference_id,
        isMyAds: true,
      });
    }
  };

  navigate = (path, payload, stack) => {
    setTimeout(() => NavigationService.navigate(path, payload, stack), 500);
  };

  registerFCMListener = () => {
    this.getPermission();

    this.createChannel();

    this.setBadge();

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   this.handleNotification(remoteMessage);
    // });

    // // Check whether an initial notification is available
    // messaging()
    //   .getInitialNotification()
    //   .then(remoteMessage => {
    //     if (remoteMessage) {
    //       this.handleNotification(remoteMessage, true);
    //     }
    //   });

    this.unsubscribe = messaging().onMessage(({ data, notification }) => {
      if (data.payload) {
        this.handleLocalNotificationChat(data, notification);
      } else {
        if (
          DeliveryRoomHelper.isDeliveryModuleNotification(data.identifier) &&
          [
            'DeliveryHome',
            'ViewCurrentDelivery',
            'AddDeliveryConfirmation',
          ].includes(NavigationService.getCurrentRouteName())
        ) {
        } else if (
          (RestaurantDeliveryHelper.isRestaurantDeliveryNotification(
            data.identifier
          ) ||
            RestaurantDeliveryHelper.isRestaurantNotification(
              data.identifier
            )) &&
          ['FoodTabHome', 'FoodOrderDetail', 'FoodOrderInProgress'].includes(
            NavigationService.getCurrentRouteName()
          )
        ) {
        } else {
          this.showLocalNotification(
            notification.title,
            notification.body,
            data
          );
        }
      }

      /*
      if (
        DeliveryRoomHelper.isDeliveryModuleNotification(data.identifier) &&
        ![
          'DeliveryHome',
          'ViewCurrentDelivery',
          'AddDeliveryConfirmation',
        ].includes(NavigationService.getCurrentRoute()?.name)
      ) {
        this.showLocalNotification(notification.title, notification.body, data);
      }
      */
    });
  };

  configure = () =>
    PushNotification.configure({
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: this.handleNotification, //(...all) => console.log(...all, 'all'),
    });

  unRegisterFCMListener() {
    this.unsubscribe?.();
  }

  removeAllNotifications() {
    if (Util.isPlatformAndroid()) {
      PushNotification.removeAllDeliveredNotifications();
      PushNotification.setApplicationIconBadgeNumber(0);
    } else {
      PushNotificationIOS.removeAllDeliveredNotifications();
      PushNotificationIOS.setApplicationIconBadgeNumber(0);
    }
  }
}
export default new FirebaseUtils();
