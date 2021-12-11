export const getSearchHistory = key => store =>
  store.searchHistory[key] ? store.searchHistory[key] : [];
