import ChatHelper from '../ChatUtil/ChatHelper';
import { FILTER, NOTIFICATION_IDENTIFIERS } from '../config/Constants';
import { Util } from '../utils';

function id(data) {
  return data?._id ?? '';
}

function title(data) {
  return data?.title ?? '';
}

function description(data) {
  return data?.description ?? '';
}

function coverImage(data) {
  return data?.images ? data?.images[0] : '';
}

function images(data) {
  return data?.images ? data?.images : [];
}

function category(data) {
  return data?.category_name ?? '';
}

function rating(data) {
  return data?.avg_rating ? data?.avg_rating.toFixed(2) : '';
}

function ratingCount(data) {
  return data?.rating_count ?? 0;
}

function getRecentRating(data) {
  return data?.recent_ratings ?? [];
}

function price(data) {
  return data?.price ?? 0;
}

function isFavourite(data) {
  return data.is_liked ?? data.is_liked;
}

function goToChatScreen(data) {
  const vendor = getVendor(data);
  ChatHelper.getRoomNameAndNavigate(vendor);
}

function serviceTime(data) {
  return data?.service_time ?? '0';
}

function availability(data) {
  const newData = formatAvailability(data?.availability);

  return newData
    ? newData.filter(item => {
        if (item.status === true || item.status === 1) {
          return item;
        }
      })
    : [];
}

function formatAvailability(data) {
  const new_data = [];
  data.map(i => {
    new_data.push({
      ...i,
      time_to: Util.convert24HrTo12(i.time_to),
      time_from: Util.convert24HrTo12(i.time_from),
    });
  });
  return new_data;
}

function getLat(data) {
  return data?.lat ?? 0;
}

function getLong(data) {
  return data?.long ?? 0;
}

function getFiltersInfoServices(filters) {
  // get sort object
  const sortObject = filters?.sorting?.value ?? {};
  const rating = filters?.rating_limit ?? 0;

  // set price range
  const priceRange = filters?.price_range ?? [
    FILTER.MINIMUM_PRICE_SERVICES,
    FILTER.MAXIMUM_PRICE_SERVICES,
  ];
  // const min_price =
  //   priceRange[0] !== FILTER.MINIMUM_PRICE_SERVICES
  //     ? priceRange[0]
  //     : FILTER.MINIMUM_PRICE_SERVICES;
  // const max_price =
  //   priceRange[1] !== FILTER.MAXIMUM_PRICE_SERVICES
  //     ? priceRange[1]
  //     : FILTER.MAXIMUM_PRICE_SERVICES;

  const min_price = priceRange[0];
  const max_price = priceRange[1];

  const filtersPayload = { ...sortObject };
  let filterCount = 0;
  if (
    min_price > FILTER.MINIMUM_PRICE_SERVICES ||
    max_price < FILTER.MAXIMUM_PRICE_SERVICES
  ) {
    filterCount += 1;

    filtersPayload.min_price = min_price;
    filtersPayload.max_price = max_price;

    // if (min_price) {
    //   filtersPayload.min_price = min_price;
    // }
    // if (max_price) {
    //   filtersPayload.max_price = max_price;
    // }
  }
  if (Util.isNotEmpty(sortObject)) {
    filterCount += 1;
  }
  if (rating) {
    filterCount += 1;
    filtersPayload.rating_limit = rating;
  }

  return { filtersPayload, filterCount };
}

function getVendor(data) {
  return data?.vendor_detail ?? {};
}

function getVendorId(data) {
  return data?.vendor_detail?._id ?? '';
}

function getVendorName(data) {
  return data?.vendor_detail?.name ?? '';
}

function getVendorImage(data) {
  return data?.vendor_detail?.avatar ?? '';
}

function isServiceNotification(identifier) {
  const {
    SERVICE_ORDER_CANCELLED,
    SERVICE_BOOKING_REMINDER,
  } = NOTIFICATION_IDENTIFIERS;
  return [SERVICE_ORDER_CANCELLED, SERVICE_BOOKING_REMINDER].includes(
    identifier
  );
}

export default {
  id,
  title,
  description,
  coverImage,
  images,
  category,
  rating,
  ratingCount,
  price,
  isFavourite,
  serviceTime,
  availability,
  getLat,
  getLong,
  goToChatScreen,
  getFiltersInfoServices,
  getVendor,
  getVendorId,
  getVendorName,
  getVendorImage,
  getRecentRating,
  isServiceNotification,
};
