const defaultList = [];
const defaultObject = {};

export const getServicesData = store => store.services.data;

export const getServicesList = identifier => store =>
  store.services[identifier] ? store.services[identifier] : defaultList;

export const getServicesItem = id => store =>
  store.services.data[id] ? store.services.data[id] : defaultObject;

export const getServicesProfile = id => store =>
  store.services.usersProfile[id]
    ? store.services.usersProfile[id]
    : defaultObject;

export const getBookingSlots = store =>
  store.services.slots ? store.services.slots : defaultList;
