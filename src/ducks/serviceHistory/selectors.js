const defaultList = [];
const defaultObject = {};

export const getServiceHistoryData = store => store.serviceHistory.data;

// export const getServiceHistoryList = (...identifiers) => store =>
//   Object.values(store.serviceHistory?.data)?.filter(order =>
//     [...identifiers].includes(ServiceHistoryUtil.getStatus(order))
//   ) ?? defaultList;

export const getServiceHistoryList = key => store =>
  store.serviceHistory?.[key] ?? defaultList;

export const getServiceHistoryItem = id => store =>
  store.serviceHistory.data?.[id] ?? defaultObject;

export const getCheckoutData = store => store.serviceHistory.checkoutData;
