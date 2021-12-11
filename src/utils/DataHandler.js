import _ from 'lodash';

let socketConnected = null;
// chat //
let store,
  // onAuthorization,
  isLogin = false,
  optionsModalRef = null,
  CategoryModalRef = null,
  dropdownModalRef = null,
  isInternetConnected = true,
  datePickerModalRef = null,
  monthYearPickerModalRef = null,
  blurViewRef = null,
  completedModaRef = null,
  imageViewerModalRef = null,
  tipModaRef = null,
  topLoaderRef = null,
  guestLoaderRef = null,
  classifiedAdInfo = {},
  SliderImagesModalRef = null,
  advertisingInfo = {},
  shouldNavigateToDeliveryMap = false;
export default {
  setStore(value) {
    store = value;
  },

  getStore() {
    return store;
  },

  setGuestModalRef(ref) {
    guestLoaderRef = ref;
  },

  getGuestModalRef() {
    return guestLoaderRef;
  },

  // setAuthorizationCB(_cb) {
  //   onAuthorization = _cb;
  // },

  // getAuthorizationCB() {
  //   return onAuthorization;
  // },

  setSliderModalRef(ref) {
    SliderImagesModalRef = ref;
  },

  getSliderModalRef() {
    return SliderImagesModalRef;
  },

  setClassifiedAdInfo(info) {
    classifiedAdInfo = { ...classifiedAdInfo, ...info };
  },

  resetClassifiedAdInfo(info) {
    classifiedAdInfo = info;
  },

  getClassifiedAddInfo() {
    return classifiedAdInfo;
  },

  setNavigateToDeliveryMap(bool = true) {
    shouldNavigateToDeliveryMap = bool;
  },

  getNavigateToDeliveryMap() {
    return shouldNavigateToDeliveryMap;
  },

  setTopLoaderRef(value) {
    topLoaderRef = value;
  },

  getTopLoaderRef() {
    return topLoaderRef;
  },

  setInternetConnected(connected) {
    isInternetConnected = connected;
  },

  getIsInternetConnected() {
    return isInternetConnected;
  },

  setUserLogin(is_login) {
    isLogin = is_login;
  },

  isUserLogin() {
    return isLogin;
  },

  setMonthYearPickerModalRef(ref) {
    monthYearPickerModalRef = ref;
  },

  getMonthYearPickerModalRef() {
    return monthYearPickerModalRef;
  },

  setDatePickerModalRef(ref) {
    datePickerModalRef = ref;
  },

  getDatePickerModalRef() {
    return datePickerModalRef;
  },

  setCompletedModalRef(ref) {
    completedModaRef = ref;
  },

  getCompletedModalRef() {
    return completedModaRef;
  },

  setImageViewerModalRef(ref) {
    imageViewerModalRef = ref;
  },

  getImageViewerModalRef() {
    return imageViewerModalRef;
  },

  setTipModalRef(ref) {
    tipModaRef = ref;
  },

  getTipModalRef() {
    return tipModaRef;
  },

  setDropDownModalRef(ref) {
    dropdownModalRef = ref;
  },

  getDropDownModalRef() {
    return dropdownModalRef;
  },

  setOptionsModalRef(ref) {
    optionsModalRef = ref;
  },

  getOptionsModalRef() {
    return optionsModalRef;
  },

  setBlurViewRef(ref) {
    blurViewRef = ref;
  },

  getBlurViewRef() {
    return blurViewRef;
  },

  setCategoryModalRef(ref) {
    CategoryModalRef = ref;
  },

  getCategoryModalRef() {
    return CategoryModalRef;
  },

  setAdvertisingInfo(info) {
    advertisingInfo = { ...advertisingInfo, ...info };
  },

  resetAdvertisingInfo(info) {
    advertisingInfo = info;
  },

  getAdvertisingInfo() {
    return advertisingInfo;
  },

  // chat

  setSocketConnected(isConnected) {
    console.log('Socketd->', isConnected);
    socketConnected = isConnected;
  },

  isSocketConnected() {
    return socketConnected;
  },
};
