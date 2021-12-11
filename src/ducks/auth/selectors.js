import { Util } from '../../utils';

export const getUser = store => store.auth.data;

export const getUserToken = store => store.auth?.data?.auth?.token ?? '';

export const getDeviceToken = store => store.auth?.data?.device_token ?? '';

export const getUserID = store => store?.auth?.data?._id ?? '';

export const isGuest = store => Util.isEmpty(getUserID(store));

export const getStripeCustomerID = store =>
  store.auth?.data?.stripe_customer_details?.data?.id ?? '';
