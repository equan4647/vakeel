const defaultList = [];
const defaultObject = {};

// export const getAdvertisementData = store => {
//   console.log('store', store);
//   // store.advertising.data;
//   return store;
// };


export const getAdvertisementData = store => store.advertising.data;



export const getAdvertisingList = identifier => store =>
  store.advertising[identifier] ? store.advertising[identifier] : defaultList;

export const getAdvertisementItem = id => store =>
  store.advertising.data[id] ? store.advertising.data[id] : defaultObject;
