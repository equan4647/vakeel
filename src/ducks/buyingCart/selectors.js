import _ from 'lodash';

export const getProductCartItem = attrID => store =>
  store.buyingCart.data?.[attrID] ?? {};

export const getProductQuantityInCart = attrId => store =>
  store.buyingCart.data?.[attrId]?.quantity ?? 0;

export const getProductCart = store =>
  _.isEmpty(store.buyingCart.data) ? [] : Object.values(store.buyingCart.data);

export const getCartAmount = store => store.buyingCart?.sum ?? 0;

export const getMyCart = store => store.buyingCart.myCart;
