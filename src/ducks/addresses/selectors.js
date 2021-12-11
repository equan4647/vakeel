export const getAddresses = store => Object.values(store.addresses?.data) ?? [];

export const getAddressItem = id => store => store.addresses?.data?.[id] ?? {};

export const getDefaultAddress = store =>
  getAddresses(store).filter(addressItem => addressItem.is_default == 1)[0] ??
  {};

export const getDefaultAddressID = store =>
  getAddresses(store).filter(addressItem => addressItem.is_default == 1)[0]
    ?._id ?? '';
