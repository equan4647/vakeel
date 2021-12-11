const defaultList = [];
const defaultObject = {};

export const getOrdersData = store => store.orders.data;

// export const getOrdersList = (...identifiers) => store =>
//   Object.values(store.orders?.data)?.filter(order =>
//     [...identifiers].includes(OrderUtil.getStatus(order))
//   ) ?? defaultList;

export const getOrdersList = key => store => store.orders?.[key] ?? defaultList;

export const getOrderItem = id => store =>
  store.orders.data?.[id] ?? defaultObject;

export const getCheckoutData = store => store.orders.checkoutData;
