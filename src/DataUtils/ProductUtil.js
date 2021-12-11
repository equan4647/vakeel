import { FILTER, NOTIFICATION_IDENTIFIERS } from '../config/Constants';
import { AppUtil, Util } from '../utils';

import _ from 'lodash';
import { UserUtil } from '.';
import ChatHelper from '../ChatUtil/ChatHelper';

function isFavourite(item) {
  return item?.is_added_to_wishlist === 1 ? true : false;
}

function getId(item) {
  return item?._id ?? '';
}

function getRatingCount(item) {
  return item?.rating_count ?? 0;
}

function getRecentRating(item) {
  return item?.recent_ratings ?? [];
}

function getAverageRating(item) {
  return item?.avg_rating ?? 0;
}

function getProductTitle(item) {
  return item?.title ?? '';
}

function getProductDescription(item) {
  return item?.description ?? '';
}

function getProductPrice(item, attrId, format = true) {
  let price = attrId
    ? item?.product_attributes?.find(
        _data => _data?.product_attribute_id === attrId
      )?.price
    : item?.product_attributes?.[0]?.price;

  price = Number(price) ?? '';
  return format ? AppUtil.formatPrice(price) : Number(price).toFixed(2);
}

function getDiscountedPrice(item, attrId, format = true) {
  let price = attrId
    ? item?.product_attributes?.find(
        _data => _data?.product_attribute_id === attrId
      )?.discount_price
    : item?.product_attributes?.[0]?.discount_price;

  price = Number(price) ?? '';
  return format ? AppUtil.formatPrice(price) : Number(price).toFixed(2);
}

function isDiscounted(item) {
  const discountedPrice = getDiscountedPrice(item, null, false);
  return discountedPrice && discountedPrice > 0;
}

function getProductCoverImage(item, index = 0) {
  return item?.product_attributes?.[index]?.images?.[0] ?? '';
}

function getProductImageByAttr(item, attrId) {
  return (
    item?.product_attributes?.filter(
      _data => _data?.product_attribute_id === attrId
    )?.[0]?.images?.[0] ?? ''
  );
}

function getCoverImageCollection(item, index = 0) {
  return item?.product_attributes?.flatMap(attr => attr.images) ?? [];
}

function getProperties(item) {
  return item?.single_attributes ?? [];
}

function getPropertyName(item) {
  return item?.attribute_name ?? '';
}

function getPropertyValue(item) {
  return item?.attribute_value ?? '';
}

function getAttribiuteId(item, index = 0) {
  return item?.product_attributes?.[index]?.product_attribute_id ?? '';
}

function getRelatedProducts(item) {
  return item?.related_products ?? [];
}

function getCartSortedByVendorName(data) {
  if (!data.length) {
    return [];
  } else {
    return _(data)
      .groupBy(x => x.item_detail.store_id)
      .map((value, key) => ({
        name: value[0].item_detail?.store_details?.name,
        store_id: value[0].item_detail?.store_id,
        items: value,
      }))
      .value();
  }
}

function getCartItemDetail(item) {
  return item?.item_detail ?? {};
}

function getCartProductId(item) {
  return item?.product_id ?? '';
}

function getVendor(item) {
  return item?.vendor_details ?? {};
}

function getLatitude(item) {
  return item?.store_details?.lat ?? '';
}

function getLongitude(item) {
  return item?.store_details?.long ?? '';
}

function getSizes(item) {
  return item?.product_attributes?.map((attr, i) => ({
    title: attr.attribute_values[1]?.attribute_value,
    id: attr?.product_attribute_id ?? i + 1,
    color: {
      id: attr?.product_attribute_id ?? i + 1,
      title: attr?.attribute_values[0]?.attribute_value?.toLowerCase(),
    },
  }));
}

function getAttribiuteData(data) {
  _(getSizes(data))
    .groupBy(x => x.title)
    .map((value, key) => ({
      title: value[0].title,
      items: value,
      id: key,
    }))
    .value();
}

function getStockQuantityByAttr(attrObject) {
  return attrObject?.in_stock_quantity ?? 0;
}

function attributesInfo(data) {
  const productAttributes = data?.product_attributes ?? [];
  const productAttributesObject = {};
  const attributesObject = {};
  productAttributes.map(item => {
    const { attribute_values, product_attribute_id, ...rest } = item;
    const attributeValues = _.chain(attribute_values)
      .keyBy('attribute_name')
      .mapValues('attribute_value')
      .value();

    //const attributeValues = _.keyBy(attribute_values, 'attribute_name');
    for (const [key, value] of Object.entries(attributeValues)) {
      const attributeValue = value || '';
      attributesObject[key] = attributesObject[key]
        ? [...attributesObject[key], attributeValue]
        : [attributeValue];
    }
    productAttributesObject[product_attribute_id] = {
      product_attribute_id,
      attribute_values: attributeValues,
      ...rest,
    };
  });
  for (const [key, value] of Object.entries(attributesObject)) {
    const uniqueArray = Array.from(new Set(value));
    attributesObject[key] = uniqueArray.map(item => {
      return { id: item, title: item };
    });
    //attributesObject[key] = attributesObject;
  }
  const attributesArray = Object.keys(attributesObject);
  return {
    productAttributesObject,
    attributesObject,
    attributesArray,
    productAttributes,
  };
}

function getPriceFromAttrObject(info, format = false) {
  return format
    ? AppUtil.formatPrice(info?.price)
    : Number(info?.price).toFixed(2);
}

function getDiscountedPriceFromAttrObject(info, format = false) {
  return format
    ? AppUtil.formatPrice(info?.discount_price)
    : Number(info?.discount_price).toFixed(2);
}

function singleAttributeInfo(attributesObject, attributeSelectd, item) {
  const itemsData = attributesObject[item] || [];
  const selectedValue = attributeSelectd?.attribute_values?.[item] ?? '';

  const selectedObject =
    selectedValue !== '' ? { id: selectedValue, title: selectedValue } : {};

  return { itemsData, selectedObject };

  //return selectedObject;
}

function getSelectedAttribute(
  itemSelectedFromAttributeList,
  attributeKey,
  attributeSelectd,
  productAttributesObject
) {
  const newAttributeValue = itemSelectedFromAttributeList.title;
  const newAttributeKey = attributeKey;
  const currentAttributes = attributeSelectd?.attribute_values ?? {};
  const newAttributes = {
    ...currentAttributes,
    [newAttributeKey]: newAttributeValue,
  };
  const matchobject = _.find(productAttributesObject, {
    attribute_values: newAttributes,
  });
  if (Util.isNotEmpty(matchobject)) {
    return matchobject;
    //setAttributeSelected(matchobject);
  } else {
    const newAttributesObject = _.cloneDeep(attributeSelectd);
    newAttributesObject.in_stock_quantity = 0;
    newAttributesObject.attribute_values = newAttributes;
    newAttributesObject.product_attribute_id = 'outofstock001';
    return newAttributesObject;
    //setAttributeSelected(newAttributesObject);
  }
}

function getNewProductCountAttribute(newAttribute, count) {
  const newQuantity = getStockQuantityByAttr(newAttribute);
  let newCount;
  if (newQuantity === 0 && count > 0) {
    newCount = 0;
  } else if (newQuantity > 0 && count === 0) {
    newCount = 1;
  } else if (newQuantity > 0 && count > 0 && count > newQuantity) {
    newCount = newQuantity;
  } else {
    newCount = count;
  }
  return newCount;
}

function getFiltersInfoBuying(filters) {
  // get sort object
  const sortObject = filters?.tags?.value ?? {};

  // set price range
  const priceRange = filters?.price_range ?? [
    FILTER.MINIMUM_PRICE_BUYING,
    FILTER.MAXIMUM_PRICE_BUYING,
  ];
  const min_price =
    priceRange[0] !== FILTER.MINIMUM_PRICE_BUYING ? priceRange[0] : '';
  const max_price =
    priceRange[1] !== FILTER.MAXIMUM_PRICE_BUYING ? priceRange[1] : '';

  const filtersPayload = { ...sortObject };
  let filterCount = 0;
  if (min_price || max_price) {
    filterCount += 1;
    if (min_price || max_price) {
      filtersPayload.min_price = min_price || FILTER.MINIMUM_PRICE_BUYING;
      filtersPayload.max_price = max_price || FILTER.MAXIMUM_PRICE_BUYING;
    }
  }
  if (Util.isNotEmpty(sortObject)) {
    filterCount += 1;
  }

  return { filtersPayload, filterCount };
  /*
  console.log('sortObject', sortObject);
  console.log('min_price', min_price);
  console.log('max_price', max_price);
  */
}

function onChat(user) {
  //const rocketChatUsername = UserUtil.getRocketChatUserName(user);
  ChatHelper.getRoomNameAndNavigate(user);
  //console.log('chat with vendor', user);
}
function onCall(user) {
  AppUtil.call(UserUtil.mobile(user));
}
function onMessage(user) {
  AppUtil.message(UserUtil.mobile(user));
}

function isMarketPlaceOrderNotification(identifier) {
  const {
    MARKETPLACE_ORDER_COMPLETED,
    MARKETPLACE_ORDER_CANCELLED,
  } = NOTIFICATION_IDENTIFIERS;
  return [MARKETPLACE_ORDER_COMPLETED, MARKETPLACE_ORDER_CANCELLED].includes(
    identifier
  );
}

function isMarketPlaceNotification(identifier) {
  const { MARKETPLACE_PRODUCT_UPDATED } = NOTIFICATION_IDENTIFIERS;
  return [MARKETPLACE_PRODUCT_UPDATED].includes(identifier);
}

export default {
  isFavourite,
  getRatingCount,
  getAverageRating,
  getProductTitle,
  getProductDescription,
  getProductPrice,
  getDiscountedPrice,
  getProductCoverImage,
  getId,
  getRecentRating,
  getCoverImageCollection,
  getProperties,
  getPropertyName,
  getPropertyValue,
  getAttribiuteId,
  getRelatedProducts,
  getCartSortedByVendorName,
  getCartItemDetail,
  getCartProductId,
  getVendor,
  getSizes,
  getAttribiuteData,
  getStockQuantityByAttr,
  getProductImageByAttr,
  attributesInfo,
  singleAttributeInfo,
  getSelectedAttribute,
  getNewProductCountAttribute,
  getLatitude,
  getLongitude,
  getFiltersInfoBuying,
  getPriceFromAttrObject,
  onChat,
  onCall,
  onMessage,
  isDiscounted,
  getDiscountedPriceFromAttrObject,
  isMarketPlaceOrderNotification,
  isMarketPlaceNotification,
};
