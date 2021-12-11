const defaultList = [];
const defaultObject = {};

export const getDeliveryHistoryList = store =>
  store.deliveryHistory.ids ?? defaultList;

// export const getClassifiedItem = id => store =>
// store.classified.data[id] ? store.classified.data[id] : defaultObject;

export const getDeliveryHistoryItem = id => store =>
  store.deliveryHistory.data[id]
    ? store.deliveryHistory.data[id]
    : defaultObject;
