import { combineReducers } from 'redux';

import drawerPreference from './drawerPreference';
import requestFlags from './requestFlags';
import location from './location';
import categories from './categories';
import products from './products';
import home from './home';

import auth from './auth';
import userRoles from './userRoles';
import network from './network';
import classified from './classified';
import deliveryHistory from './deliveryHistory';
import delivery from './delivery';
import services from './services';
import serviceHistory from './serviceHistory';
import restaurants from './restaurants';

// chat reducers
import chat from './chat';
import chatRooms from './chat/chatRooms';
import chatMessages from './chat/chatMessages';
import pushToken from './chat/pushToken';

import addresses from './addresses';
import dropdown from './dropdown';
import carousel from './carousel';
import searchHistory from './searchHistory';
import reviews from './reviews';
import buyingCart from './buyingCart';
import foodCart from './foodCart';
import orders from './orders';
import boominUsers from './boominUsers';
import payment from './payment';
import advertising from './advertising';
import radius from './radius';
import notifications from './notifications';
import foodOrders from './foodOrders';

import appleCredentials from './auth/appleCredentials';

// LOGOUT type
import { LOGOUT, USER_KICKED } from './auth/types';

const appReducer = combineReducers({
  network,
  auth,
  location,
  categories,
  products,
  home,

  // chat
  chat,
  chatRooms,
  chatMessages,
  pushToken,

  classified,
  carousel,
  requestFlags,
  drawerPreference,
  addresses,
  dropdown,
  searchHistory,
  reviews,
  buyingCart,
  orders,
  boominUsers,
  payment,
  advertising,
  radius,
  services,
  appleCredentials,
  deliveryHistory,
  delivery,
  notifications,
  serviceHistory,
  restaurants,
  foodCart,
  foodOrders,
  userRoles,
});

export default (state, action) => {
  if ([LOGOUT.SUCCESS, USER_KICKED].includes(action.type)) {
    state = {
      network: state.network,
      drawerPreference: state.drawerPreference,
      auth: state.auth,
      dropdown: state.dropdown,
      appleCredentials: state.appleCredentials,
      location: state.location,
      radius: state.radius,
      classified: state.classified,
      products: state.products,
      restaurants: state.restaurants,
      services: state.services,
      home: state.home,
      requestFlags: state.requestFlags,
      categories: state.categories,
      searchHistory: state.searchHistory,
      userRoles: state.userRoles,
    };
  }
  return appReducer(state, action);
};
