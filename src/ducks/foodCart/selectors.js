const defaultList = [];
const defaultObject = {};

export const getQuantityOfItemInCart = id => store =>
  store.foodCart.items?.[id]?.quantity ?? 0;

export const getRestaurantIdFromCart = store =>
  store.foodCart.restaurantID ?? '';

export const getRestaurantFromCart = store =>
  store.foodCart.restaurantData ?? defaultObject;

export const getFoodCartItems = store =>
  Object.values(store.foodCart.items) ?? defaultList;

export const getFoodCartItemKeys = store => store.foodCart.ids ?? defaultList;

export const getFoodItemFromCart = id => store =>
  store.foodCart.items?.[id] ?? defaultObject;
