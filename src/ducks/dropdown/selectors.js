export const getDropdownData = key => store =>
  store.dropdown[key] ? store.dropdown[key] : [];
