const defaultList = [];
const defaultItem = {};

export const getCategoriesData = store => store.categories.data;

export const getCategoriesList = identifier => store =>
  store.categories[identifier] ? store.categories[identifier] : defaultList;

export const getCategoriesItem = identifier => store =>
  store.categories[identifier] ? store.categories[identifier] : defaultItem;
