import AppLink from 'react-native-app-link';
import Share from 'react-native-share';
import moment from 'moment';
import { Linking, Platform } from 'react-native';

import _ from 'lodash';
import {
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_PICKER_TYPE,
  DATE_FORMAT_DISPLAY,
  TIME_FORMAT_DISPLAY,
  MONTH_YEAR_FORMAT_DISPLAY,
  MONTH_YEAR_FORMAT,
  CHAT_ROLE,
} from '../config/Constants';
import { DataHandler, NavigationService, Util } from '../utils';
import { BASE_URL } from '../config/WebService';
import { strings } from '../utils/i18n';

function getDateFormat(mode) {
  if (mode === DATE_PICKER_TYPE.DATE) {
    return DATE_FORMAT;
  }
  if (mode === DATE_PICKER_TYPE.TIME) {
    return TIME_FORMAT;
  }
  if (mode === DATE_PICKER_TYPE.YEAR_MONTH) {
    return MONTH_YEAR_FORMAT;
  }
  return DATE_FORMAT;
}

function getDateFormatDisplay(mode) {
  if (mode === DATE_PICKER_TYPE.DATE) {
    return DATE_FORMAT_DISPLAY;
  }
  if (mode === DATE_PICKER_TYPE.TIME) {
    return TIME_FORMAT_DISPLAY;
  }
  if (mode === DATE_PICKER_TYPE.YEAR_MONTH) {
    return MONTH_YEAR_FORMAT_DISPLAY;
  }
  return DATE_FORMAT_DISPLAY;
}

function getFormattedDate(date, mode) {
  const inputFormat = getDateFormat(mode);
  const outputFormat = getDateFormatDisplay(mode);
  return Util.formatDate(date, inputFormat, outputFormat);
}

function generateYears(yearAdd, startFrom) {
  var d = new Date();
  const currentYear = d.getFullYear() + yearAdd;
  const initialYear = startFrom ?? 1900;
  const data = [];
  for (let i = currentYear; i >= initialYear; i -= 1) {
    data.push({ id: i });
  }
  return data;
}

function openStores() {
  AppLink.openInStore({
    appName: 'WhatsApp Messenger',
    appStoreId: '310633997',
    appStoreLocale: 'us',
    playStoreId: 'com.whatsapp',
  });
}

function formatPriceInput(number) {
  let formatNumber = number
    .replace(/\D/g, '')
    .replace(/^0+/, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatNumber;
}

function removeFormatNumber(number) {
  let formatNumber = number.replace(/\D/g, '');
  return formatNumber;
}

function formatPrice(price, round = 2) {
  return `$${Number(price).toFixed(round)}`;
}

function formatPriceWithoutDecimal(price) {
  return `$${Number(price)}`;
}

function getConcatDataList(
  action,
  data,
  state,
  isUnique = false,
  isMerge = false
) {
  const stateData =
    action.identifier && action.identifier !== ''
      ? state[action.identifier] || []
      : state.data;
  let newData = action.reset
    ? data
    : isMerge
    ? _.concat(data, stateData)
    : _.concat(stateData, data);
  if (isUnique) {
    newData = Array.from(new Set(newData));
  }
  return newData;
}

function navigateToUserChat(userData, extraData) {
  const store = DataHandler.getStore().getState();
  const loginUser = store.auth.data;

  if (loginUser.rocket_chat_account && loginUser.rocket_chat_account.data) {
    // const { _id, full_name, rocket_chat_account } = userData;
    const _id = '6048b3fb17b3f1443c459a00';
    const full_name = 'Hammad';

    const rocket_chat_account = {
      data: {
        userId: 'vWY9XpQPP2YXKj5JC',
        me: {
          _id: 'vWY9XpQPP2YXKj5JC',
          username: 'bizad-dfdfdff6048b3fb17b3f1443c459a00',
        },
      },
    };

    if (
      rocket_chat_account &&
      rocket_chat_account.data &&
      rocket_chat_account.data.userId
    ) {
      console.log('navigateToUserChat', loginUser);

      const fname = full_name;
      const userId = _id;

      DataHandler.setSelectedRoom(
        {
          userId: rocket_chat_account.data.me._id,
          username: rocket_chat_account.data.me.username,
        },
        fname,
        userId
      );
      NavigationService.navigate('Chat', { chatRole: CHAT_ROLE.TOPIC_CREATOR });
      // NavigationService.navigate('Chat', { extraData });
      // Actions.chat();
    } else if (
      rocket_chat_account &&
      rocket_chat_account.user &&
      rocket_chat_account.user._id
    ) {
      const fname = full_name;
      const userId = _id;
      DataHandler.setSelectedRoom(
        {
          userId: rocket_chat_account.user._id,
          username: rocket_chat_account.user.username,
        },
        fname,
        userId
      );

      NavigationService.navigate('Chat', { extraData });
      // Actions.chat();
    }
  }

  // if (user && user.rocket_chat_object) {
  //   const fname = name;
  //   const userId = app_user_id;
  //   DataHandler.setSelectedRoom(
  //     JSON.parse(user.rocket_chat_object),
  //     fname,
  //     userId,
  //   );

  //   NavigationService.navigate("Chat");
  //   // Actions.chat();
  // }
}

function share(url = 'https://www.bizad.com') {
  console.log('url', url);
  const options = {
    title: 'Share file',
    url,
    failOnCancel: false,
  };
  Share.open(options)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      err && console.log(err);
    });
}

function call(phone) {
  if (phone) {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `tel://${phone}`;
    } else {
      number = `tel:${phone}`;
    }
    Linking.openURL(number);
  } else {
    Util.showMessage(strings('app.phone_number_not_available'));
  }
}

function message(phoneNumber) {
  if (phoneNumber) {
    const url = `sms:${phoneNumber}`;
    Linking.openURL(url);
  } else {
    Util.showMessage(strings('app.phone_number_not_available'));
  }
  //const separator = Platform.OS === 'ios' ? '&' : '?';
  //${separator}
}

function removeItemFromArrayIdentifiers(identifiers, state, id) {
  const newState = {};
  identifiers.map(identifier => {
    if (state[identifier]) {
      const oldData = state[identifier];
      const index = oldData.indexOf(id);
      if (index !== -1) {
        const newData = [...oldData];
        newData.splice(index, 1);
        newState[identifier] = newData;
      }
    }
  });
  return newState;
}

function openWebUrl(url = 'https://google.com') {
  let myurl = url;
  if (!/^https?:\/\//i.test(myurl)) {
    myurl = 'http://' + myurl;
  }
  Linking.canOpenURL(myurl).then(supported => {
    if (supported) {
      Linking.openURL(myurl);
    } else {
      console.log("Don't know how to open URI: " + myurl);
    }
  });
}

function getShareURL(module, id) {
  // http://104.248.0.22:8000/api/classified/product-detail?id=66
  // const url = `${BASE_URL}/api/classified/product-detail?id=${id}`;
  const url = `${BASE_URL}/share?app_name=bizad&module_type=${module}&item_id=${id}`;
  return url;
}

function getCalendarDate(
  includeBookedDate = true,
  val = formatedCalendarDate()
) {
  const formatedDate = formatedCalendarDate(val);

  const split_date = formatedDate.split('-');

  const year = split_date[0];
  const month = split_date[1];
  const date = split_date[2];
  const data = { date, month, year };
  // return { date, month, year, booked_date: `${month}/${date}/${year}` };
  return includeBookedDate ? { ...data, booked_date: formatedDate } : data;
}

function formatedCalendarDate(date = new Date()) {
  return Util.formatDate(date, 'YYYY-MM-DD', 'YYYY-M-D');
  // return getCalendarDate(current_date);
}

function formatBookingSlots(slots, payload) {
  const { booked_date } = payload;
  // const d1 = Date.parse(booked_date);
  // const d2 = Date.parse(moment().format('YYYY-M-D'));
  const d1 = booked_date,
    d2 = moment().format('YYYY-M-D');

  const isSameDate = d1 === d2;
  const today = new Date();
  const currentTime = today.getHours() + ':' + today.getMinutes();
  const formatedSlots = [];
  slots.map((item, index) => {
    const { timeslot, active } = item;
    const time = timeslot.split('-');
    const start_time = time[0];
    const end_time = time[1];
    const isActive = active;
    // const isActive = isSameDate ? currentTime < start_time && active : active;

    formatedSlots.push({
      id: index,
      title: format24HrTo12(start_time, end_time),
      isAvailable: isActive,
      start_time,
      end_time,
    });
  });
  return formatedSlots;
}

function format24HrTo12(start_time, end_time) {
  return `${Util.convert24HrTo12(start_time)} - ${Util.convert24HrTo12(
    end_time
  )}`;
}
function calendarFormatedDate(dateObj) {
  const { date, month, year } = dateObj;
  // return moment(`${year}-${month}-${date}`).format();
  return Util.formatDate(`${year}-${month}-${date}`, 'YYYY-M-D', 'YYYY-MM-DD');
}

function formatedBookingTime({ booked_date, start_time, end_time }) {
  const format = 'DD MMM, YYYY';
  const date = Number.isInteger(booked_date)
    ? Util.formatDate2(booked_date, format)
    : Util.formatDate(booked_date, 'YYYY-M-D', format);
  return `${date}, ${format24HrTo12(start_time, end_time)}`;
}

function calendarList(index, data) {
  const new_data = Object.values(data);

  if (index === 0) {
    return true;
  }

  const currentDate = new_data[index].booked_date;
  const previousDate = new_data[index - 1].booked_date;

  if (currentDate && previousDate) {
    return !moment(currentDate).isSame(previousDate, 'day');
  }
  return false;
}

const sortedCalendarList = data => {
  const new_data = Object.values(data);

  return new_data;
};

function convertMinToHrs(time) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  const hrs = hours > 0 ? `${hours} ${hours > 1 ? 'hrs' : 'hr'}` : '';
  const mins = minutes > 0 ? `${minutes} ${minutes > 1 ? 'mins' : 'min'}` : '';
  return `${hrs} ${mins}`;
}

function getBookingHrsDiffFromNow(date, time) {
  const bookingDate = moment(date).format('YYYY/MM/DD');

  const bookingTime = `${bookingDate} ${time}`;
  const currentTime = moment().format('YYYY/MM/DD HH:MM');

  const __duration = moment.duration(moment(bookingTime).diff(currentTime));

  const __hours = __duration.asHours();
  return __hours;
}

function doIfAuthorized(onAuthorization: Function) {
  const store = DataHandler.getStore().getState();

  if (Util.isGuest(store)) {
    // DataHandler.setAuthorizationCB(onAuthorization);
    NavigationService.navigate('Login', {}, 'AuthModal');
  } else {
    onAuthorization?.();
  }
}

function parseBookingDateTime(date, time) {
  const bookingDate = moment(date).format('YYYY/MM/DD');

  const bookingTime = `${bookingDate} ${time}`;

  return bookingTime;
}

function isReducerItemEmpty(reducer, identifier) {
  return Util.isEmpty(DataHandler.getStore().getState()[reducer][identifier]);
}

export default {
  doIfAuthorized,
  getDateFormat,
  getDateFormatDisplay,
  generateYears,
  removeItemFromArrayIdentifiers,
  getFormattedDate,
  openStores,
  formatPriceInput,
  removeFormatNumber,
  formatPrice,
  getConcatDataList,
  navigateToUserChat,
  share,
  call,
  message,
  openWebUrl,
  getShareURL,
  getCalendarDate,
  formatedCalendarDate,
  formatBookingSlots,
  formatedBookingTime,
  format24HrTo12,
  calendarList,
  sortedCalendarList,
  convertMinToHrs,
  getBookingHrsDiffFromNow,
  parseBookingDateTime,
  calendarFormatedDate,
  isReducerItemEmpty,
  formatPriceWithoutDecimal,
};
