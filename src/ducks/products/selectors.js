const defaultList = [];
const defaultObject = {};

export const getProductsData = store => store.products.data;

export const getProductsList = identifier => store =>
  store.products?.[identifier] ?? defaultList;

export const getProductItem = id => store =>
  store.products.data?.[id] ?? defaultObject;

export const getProductItemByAttr = (itemID, attrID) => store =>
  store.products.data?.[itemID]?.product_attributes?.filter(
    attribute => attribute?.product_attribute_id === attrID
  )?.[0] ?? '';
