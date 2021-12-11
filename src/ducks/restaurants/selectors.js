const defaultList = [];
const defaultObject = {};

export const getRestaurants = identifier => store => {
  return store.restaurants?.[identifier] ?? defaultList;
};
export const getRestaurantItem = id => store => {
  const data = store.restaurants.data?.[id];
  if (store.restaurants.data?.[id]) {
    return data?.resturant_detail ?? data;
  } else {
    return defaultObject;
  }
  // resturant_detail
};

export const getFoodItem = (id, restaurantID) => store =>
  store.restaurants.data?.[restaurantID]?.items?.find(val => val?._id == id);
