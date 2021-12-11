const defaultList = [];
const defaultObject = {};

export const getClassifiedData = store => store.classified.data;

export const getClassifiedList = identifier => store =>
  store.classified[identifier] ? store.classified[identifier] : defaultList;

export const getClassifiedItem = id => store =>
  store.classified.data[id] ? store.classified.data[id] : defaultObject;

export const getClassifiedProfile = id => store =>
  store.classified.usersProfile[id]
    ? store.classified.usersProfile[id]
    : defaultObject;
