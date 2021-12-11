import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Platform, Keyboard, StatusBar, Alert } from 'react-native';
import { MessageBarManager } from 'react-native-message-bar';
import ActionSheet from 'react-native-action-sheet';
import { normalize, schema } from 'normalizr';
import moment from 'moment';
import _ from 'lodash';

import {
  DATE_FORMAT,
  DELIVERY_VEHICLE_SPEED,
  MODULE,
  ORDER_STATUS,
  SERVICE_ITEM_TYPE,
} from '../config/Constants';
import myOrders from '../data/myOrders';
import DataHandler from './DataHandler';
import { NavigationService, Util } from '.';
import { Colors, Images } from '../theme';
import { strings } from './i18n';
import {
  requestAddtoFavorite,
  requestRemoveFromFavorite,
} from '../ducks/products/actions';
import { classifiedActions } from '../ducks/classified';
import { getNetworkInfo } from '../ducks/network/selectors';
import { getActiveOrder } from '../ducks/delivery/selectors';
import { servicesActions } from '../ducks/services';
import { isGuest as isGuestRole } from '../ducks/auth/selectors';
import AppUtil from './AppUtil';
import { ChatHelper } from '../ChatUtil';

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
  switch (routeName) {
    case 'Home':
      return getFocusedRouteNameFromRoute(route);
  }
}

function isWalletCharged(data) {
  return data?.use_wallet == 1;
}

function isCardCharged(data) {
  return data?.use_card == 1;
}

function stringToDateObject(date, format) {
  if (date === '') {
    return new Date();
  }
  return moment(date, format).toDate();
}

function showActionSheet(options: Array, onPress, destructiveIndex) {
  ActionSheet.showActionSheetWithOptions(
    {
      options: options,
      cancelButtonIndex: options.length - 1,
      destructiveButtonIndex: destructiveIndex ?? options.length - 2,
      tintColor: Colors.brightBlue,
    },
    onPress
  );
}

function getCardImage(type) {
  const _type = type.toLowerCase(type);
  switch (_type) {
    case 'diners club':
      return Images.cards.dinersClub;

    case 'visa':
      return Images.cards.visa;

    case 'Discover':
      return Images.cards.discover;

    case 'american express':
      return Images.cards.americanExpress;

    case 'mastercard':
      return Images.cards.masterCard;

    case 'jcb':
      return Images.cards.jcb;

    default:
      return Images.cards.dummyCard;
  }
}

function redirectFromCalendar(type, id) {
  if (type === 'topic') {
    NavigationService.navigate(
      'ConsultancyDetail',
      { isScheduled: true },
      'ConsultancyStack'
    );
  } else {
    NavigationService.navigate('ServiceBookingDetails', {
      booking_id: id,
      type: SERVICE_ITEM_TYPE.PENDING,
    });
  }
}

function navigateFromDrawer(route, params, stack, timeout = 20) {
  setImmediate(NavigationService.closeDrawer);

  setTimeout(() => NavigationService.navigate(route, params, stack), timeout);
}

function navigateToSearchResult(_keyword, _module, _flow, _params) {
  const searchParams = { keyword: _keyword, _module, _flow, ..._params };
  const params = { category: _keyword, _module, _flow, ..._params };
  switch (_module) {
    case MODULE.CLASSIFIED:
      if (_flow === 'search') {
        NavigationService.navigate('SearchedClassified', searchParams);
      } else {
        NavigationService.navigate('AddClassifiedDetail', params);
      }
      break;

    case MODULE.BUYING:
      if (_flow === 'search') {
        NavigationService.navigate('SearchedBuyingItems', searchParams);
      }
      break;

    case MODULE.TOPICS:
      if (_flow === 'search') {
        NavigationService.navigate('SearchedTopics', searchParams);
      }
      break;

    case MODULE.FOOD:
      // if (_flow === 'search') {
      NavigationService.navigate('SearchedFood', searchParams);
      // }
      break;

    case MODULE.SERVICE:
      if (_flow === 'search') {
        NavigationService.navigate('SearchedServiceItems', searchParams);
      } else {
        NavigationService.navigate('SearchedServiceCats', params);
      }
      break;
  }
}

function getDistanceFromLatLonInKm(lt1, lng1, lt2, lng2, format = false) {
  const lat1 = Number(lt1),
    lon1 = Number(lng1),
    lat2 = Number(lt2),
    lon2 = Number(lng2);

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  if (format) {
    return formatDitance(d);
  }
  return d;
}

function formatDitance(d) {
  if (d >= 0.5) {
    return `${parseFloat(d.toFixed(2))} ${Math.floor(d) > 1 ? 'kms' : 'km'}`;
  } else {
    return `${Math.floor(d * 1000)} ${
      Math.floor(d * 1000) > 1 ? 'meters' : 'meter'
    }`;
  }
}

function getEstTimeDurationAndDist(lat1, lon1, lat2, lon2, getSecs = false) {
  const distInKMs = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2),
    timeToTravel = getEstimatedSecsByKMs(distInKMs, DELIVERY_VEHICLE_SPEED);

  return {
    distance: formatDitance(distInKMs),
    time: getSecs ? timeToTravel : getTimeDurationFromSecs(timeToTravel),
  };
}

function getTimeDurationFromSecs(sec) {
  const returnNonZero = (val, entity) => (val > 0 ? `${val}${entity}, ` : '');
  const timeObj = moment.duration(sec, 'seconds');
  let { seconds, minutes, hours, days } = timeObj._data;

  return `${returnNonZero(days, 'days')}${returnNonZero(
    hours,
    'hrs'
  )}${returnNonZero(minutes, 'min')}`;

  /*
  return `${returnNonZero(days, 'days')}${returnNonZero(
    hours,
    'hrs'
  )}${returnNonZero(minutes, 'min')}${returnNonZero(seconds, 'sec')}`;
    */
}

function getEstimatedSecsByKMs(dist, speed) {
  const distInMeters = dist * 1000,
    speedInMbyS = speed / 3.6,
    timeInSec = distInMeters / speedInMbyS;
  return timeInSec;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function showOptionModal(data) {
  DataHandler.getOptionsModalRef().show(data);
}

function hideOptionModal() {
  DataHandler.getOptionsModalRef().hide();
}

function showBlurView(data) {
  DataHandler.getBlurViewRef().show(data);
}

function hideBlurView(module) {
  DataHandler.getBlurViewRef().hide(module);
}

function showCategoryModal() {
  DataHandler.getCategoryModalRef().show();
}

function hideCategoryModal() {
  DataHandler.getCategoryModalRef().hide();
}

function getNestedRouteName(route) {
  return getFocusedRouteNameFromRoute(route);
}

function isPlatformAndroid() {
  return Platform.OS === 'android';
}

function isPlatformIOS() {
  return Platform.OS === 'ios';
}

function getPlatform() {
  return Platform.OS;
}

function isEmpty(data) {
  return _.isEmpty(data);
}

function formatDate(dateString, currentDateFormat, formattedDateFormat) {
  return dateString
    ? moment(dateString, currentDateFormat).format(formattedDateFormat)
    : '';
}

function formatDate2(dateString, formattedDateFormat) {
  return dateString ? moment(dateString).format(formattedDateFormat) : '';
}

function getFullDateTime(date) {
  return Util.formatDate2(date, 'MMM DD, YYYY, h:mm A');
}

function formatDateDayChat(date) {
  if (date && date !== null) {
    return moment(date).calendar(null, {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      lastWeek: 'dddd',
      sameElse: 'ddd, D MMM',
    });
  }
  return '';
}

function formatTime(
  time,
  inputFormat = 'HH:mm:ss',
  outputFormat = 'H:mm',
  defaultValue = '00:00'
) {
  return time && time !== ''
    ? moment(time, inputFormat).format(outputFormat)
    : defaultValue;
}

function getCurrentDate(format = DATE_FORMAT) {
  return moment().format(format);
}

function getDate(date, format = DATE_FORMAT) {
  return moment(date).format(format);
}

const getTintColor = status => {
  switch (status) {
    case ORDER_STATUS.COMPLETED:
    case ORDER_STATUS.SCHEDULED:
    case ORDER_STATUS.ACCEPTED:
    case ORDER_STATUS.DELIVERED:
      return Colors.primary;

    case ORDER_STATUS.CANCELLED:
    case ORDER_STATUS.CANCELLED_BY_CUSTOMER:
      return Colors.orangeRed;

    case ORDER_STATUS.IN_PROGRESS:
    case ORDER_STATUS.PENDING:
    case ORDER_STATUS.DISPATCHED:
      return Colors.pumpkinOrange;

    default:
      return Colors.black;
  }
};

function showMessage(message, alertType = 'error', duration: 5000) {
  MessageBarManager.showAlert({
    message,
    alertType,
    duration,
    stylesheetInfo: { backgroundColor: Colors.primary },
    messageStyle: { color: Colors.white },
  });
}

function alertUserReported() {
  alert(strings('app.user_reported'));
}

function showMoreOptions(options, destructiveIndex = -1) {
  const handleOptions = index => {
    [Object.keys(options).length, undefined].includes(index)
      ? DoNothing()
      : Object.values(options)[index]();
  };

  showActionSheet(
    [...Object.keys(options), strings('app.cancel')],
    handleOptions,
    destructiveIndex
  );
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100000000000 + 1);
}

function getFormattedDateTime(dateTime, Format = 'YYYY-MM-DD', incomingFormat) {
  return incomingFormat
    ? moment(dateTime, incomingFormat).format(Format)
    : moment(dateTime).format(Format);
}

function getDateDifferenceInDays(
  date1,
  date2,
  format = 'YYYY-DD-MM',
  unit = 'days'
) {
  const a = moment(date1, format);
  const b = moment(date2, format);

  return b.diff(a, unit);
}

function hideMessageBar() {
  try {
    MessageBarManager.hideAlert();
  } catch (error) {}
}

function createSlug(text: String) {
  return text?.trim().toLocaleLowerCase().split(' ').join('_');
}

function DoNothing() {
  return null;
}

function alterObjKeys(obj, replacingKeys) {
  let myObj = { ...obj };
  for (let key in myObj) {
    if (replacingKeys.hasOwnProperty(key)) {
      myObj[replacingKeys[key]] = myObj[key];
      delete myObj[key];
    }
  }
  return myObj;
}

function formatNumberToLocal(x, toFixed = false) {
  let stringX = x.toString().replace(/[^\d.-]/g, '');

  if (toFixed) {
    stringX = `${toFixedIfNecessary(stringX)}`;
  }

  const parts = stringX.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  let newNumber = parts.join('.');
  if (Number(removeFormatLocalNumber(newNumber)) < 0) {
    newNumber = `(${newNumber.substring(1)})`;
  }
  return newNumber;
}

function isNotEmpty(data) {
  return !_.isEmpty(data, true);
}

function clone(data) {
  return _.clone(data);
}

function cloneDeep(data) {
  return _.cloneDeep(data);
}

function getTimeDiffInMinutes(timeStamp) {
  return (Number(new Date()) - Number(new Date(timeStamp))) / (1000 * 60);
}

function compareDeep(previous, next) {
  return !_.isEqual(previous, next);
}

function compareDates(date1, date2) {
  if (date1 && date2) {
    return moment(date1).isSame(date2, 'day');
  }
  return false;
}

function removeFormatLocalNumber(x) {
  return x.toString().replace(/[^\d.-]/g, '');
}

function toFixedIfNecessary(value, dp = 1) {
  return +parseFloat(value).toFixed(dp);
}

// temporary function =>alpha
function searchBringerAndPlaceOrder() {
  Keyboard.dismiss();
  function cancel() {
    hideBlurView();
    clearTimeout(SchedulePlaceOrder);
    clearTimeout(ScheduleOrderAccepted);
    clearTimeout(ScheduleRedirect);
  }
  showBlurView({
    title: 'Searching Bringer',
    text: 'Your order will be place as sopon as we find the brigner for you',
    buttonTitle: 'Cancel Search',
    onPressButton: cancel,
  });
  const SchedulePlaceOrder = setTimeout(() => {
    showBlurView({
      title: 'Placing Order',
      text: 'Your order will be placed shortly',
      buttonTitle: 'Cancel Order',
      onPressButton: cancel,
    });
  }, 1000);
  const ScheduleOrderAccepted = setTimeout(() => {
    showBlurView({
      title: 'Order Accepted',
      text: 'Restaurant accepted order processing details',
    });
  }, 2000);
  const ScheduleRedirect = setTimeout(() => {
    hideBlurView();
    NavigationService.reset('FoodOrderInProgress', myOrders.food[0]);
  }, 3000);
}

function setStatusBarStyle(barStyle) {
  StatusBar.setBarStyle(barStyle, true);
}

function showAlertConfirm(
  title,
  message,
  doneText,
  onDonePress,
  cancelText = strings('app.cancel')
) {
  Alert.alert(
    title,
    message,
    [
      {
        text: cancelText,
        onPress: () => {},
        style: 'cancel',
      },
      { text: doneText, onPress: () => onDonePress() },
    ],
    { cancelable: true }
  );
  //StatusBar.setBarStyle(barStyle, true);
}

const EditorFontsList = [
  'Arial',
  'Helvetica',
  'Georgia',
  'Times',
  'Verdana',
  'Courier New',
  'Optima',
  'Bradley Hand',
  'Trebuchet MS',
  'Times New Roman',
  'Didot',
  'American Typewriter',
  'Courier',
];

function normalizeData(data, id = '_id') {
  const offerSchema = new schema.Entity('listItems', {}, { idAttribute: id });
  const offerListSchema = [offerSchema];
  const normalizedData = normalize(data, offerListSchema);
  return {
    ids: normalizedData.result,
    items: normalizedData.entities.listItems || {},
  };
}

function getFilterCount(data) {
  let count = Object.keys(data).length;

  if (data.min_price && data.min_price === 0) {
    count--;
  }
  if (data.max_price && data.max_price === 100000) {
    count--;
  }

  return count;
}

function AddProductToFavorites(item_id, isFav) {
  const { dispatch, getState } = DataHandler.getStore();

  let addToFav = () => {
    if (getNetworkInfo(getState())) {
      isFav
        ? dispatch(requestRemoveFromFavorite({ item_id }))
        : dispatch(requestAddtoFavorite({ item_id }));
    } else {
      showMessage(strings('api_error_messages.network_not_available'));
    }
  };

  AppUtil.doIfAuthorized(addToFav);
}

function getDateFromNow(date) {
  return date ? moment(date).fromNow() : '';
}

function addClassifiedToFavorites(product_id, isFavourite) {
  const { dispatch, getState } = DataHandler.getStore();

  let addToFav = () => {
    if (getNetworkInfo(getState())) {
      dispatch(classifiedActions.requestAddtoFavorite(product_id, isFavourite));
    } else {
      showMessage(strings('api_error_messages.network_not_available'));
    }
  };

  AppUtil.doIfAuthorized(addToFav);
}

function navigateToAuthorizedApp() {
  NavigationService.reset('Main');
  ChatHelper.connectOnLogin();
}

function addServiceToFavorites(service_id, isFavourite) {
  const { dispatch, getState } = DataHandler.getStore();

  const user_id = getState().auth.data._id;

  let addToFav = () => {
    if (getNetworkInfo(getState())) {
      dispatch(
        servicesActions.requestAddtoFavorite(service_id, isFavourite, user_id)
      );
    } else {
      showMessage(strings('api_error_messages.network_not_available'));
    }
  };

  AppUtil.doIfAuthorized(addToFav);
}

function generateDropdownRange(limit, startWith = 1, offset = 1) {
  return _.range(startWith, limit + 1, offset).map(item => ({
    title: item,
    id: item,
  }));
}

function getUserInfo() {
  return DataHandler.getStore().getState()?.auth?.data ?? {};
}

function getCurrentDelivery() {
  return getActiveOrder(DataHandler.getStore().getState());
}

function convert24HrTo12(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? ' AM' : ' PM';
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

function formatDate3(dateString, formattedDateFormat) {
  const currentDate = getCurrentDate(formattedDateFormat);
  const previousDate = formatDate2(dateString, formattedDateFormat);
  const diffInDays = getDateDifferenceInDays(
    previousDate,
    currentDate,
    formattedDateFormat
  );
  // if (diffInDays < 1) {
  //   return 'Today';
  // }
  return previousDate;
}

function minToHoursAndMins(_minutes) {
  let numOfHrs = `${Math.floor(_minutes / 60)} `;
  numOfHrs = numOfHrs > 0 ? `${numOfHrs} hr` : '';

  let numOfMins = _minutes % 60;
  numOfMins = numOfMins > 0 ? `${numOfMins} mins` : '';

  return numOfHrs + numOfMins;
}

function getID(data) {
  return data?._id ?? '';
}

function getStatus(data) {
  return data?.status ?? '';
}

function isStatusPending(data) {
  return getStatus(data) === ORDER_STATUS.PENDING;
}

function isStatusInProgress(data) {
  return getStatus(data) === ORDER_STATUS.IN_PROGRESS;
}

function isStatusDelivered(data) {
  return getStatus(data) === ORDER_STATUS.DELIVERED;
}

function isStatusCancelled(data) {
  return getStatus(data) === ORDER_STATUS.CANCELLED;
}

function pickupReached(data) {
  return data?.pickup_reached == 1;
}

function driverInfo(data) {
  return data?.driver_obj ?? {};
}

function isRouteActive(route: String) {
  return NavigationService.getCurrentRouteName() == route;
}

function translucentApp() {
  if (isPlatformAndroid()) {
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
  }
}

function formatImageViewerData(data) {
  let images;
  if (_.isArray(data)) {
    images = data.map(item => {
      return { url: item };
    });
  } else {
    images = [{ url: data }];
  }
  return images;
}

function isGuest() {
  const storeState = DataHandler.getStore()?.getState();

  return isGuestRole(storeState);
}

function promptPayment(onProceed) {
  Util.showAlertConfirm(
    strings('app.are_you_sure'),
    strings('messages.proceed_for_payment'),
    strings('app.proceed'),
    onProceed
  );
}

export default {
  promptPayment,
  isRouteActive,
  isStatusCancelled,
  isStatusDelivered,
  driverInfo,
  pickupReached,
  isStatusInProgress,
  isStatusPending,
  getStatus,
  getID,
  minToHoursAndMins,
  getDistanceFromLatLonInKm,
  getCurrentDelivery,
  getUserInfo,
  translucentApp,
  showMessage,
  setStatusBarStyle,
  isPlatformAndroid,
  isPlatformIOS,
  getPlatform,
  isEmpty,
  stringToDateObject,
  formatDate,
  addClassifiedToFavorites,
  getCurrentDate,
  normalizeData,
  getDate,
  isNotEmpty,
  clone,
  cloneDeep,
  compareDeep,
  formatDate2,
  getRandomNumber,
  getFullDateTime,
  getFormattedDateTime,
  getDateDifferenceInDays,
  hideMessageBar,
  getHeaderTitle,
  getNestedRouteName,
  formatTime,
  showOptionModal,
  hideOptionModal,
  showCategoryModal,
  hideCategoryModal,
  createSlug,
  showActionSheet,
  navigateToSearchResult,
  formatNumberToLocal,
  showBlurView,
  hideBlurView,
  searchBringerAndPlaceOrder,
  navigateToAuthorizedApp,
  DoNothing,
  compareDates,
  EditorFontsList,
  redirectFromCalendar,
  alertUserReported,
  showAlertConfirm,
  showMoreOptions,
  navigateFromDrawer,
  getFilterCount,
  formatDateDayChat,
  AddProductToFavorites,
  generateDropdownRange,
  getCardImage,
  getTintColor,
  alterObjKeys,
  getDateFromNow,
  addServiceToFavorites,
  convert24HrTo12,
  getTimeDiffInMinutes,
  formatDitance,
  getEstTimeDurationAndDist,
  formatDate3,
  toFixedIfNecessary,
  isWalletCharged,
  isCardCharged,
  formatImageViewerData,
  isGuest,
};
