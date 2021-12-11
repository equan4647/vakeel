import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH-mm';
export const DATE_FORMAT_DISPLAY = 'D MMM, YYYY';
export const TIME_FORMAT_DISPLAY = 'h:mm A';
export const MONTH_YEAR_FORMAT = 'YYYY-MM';
export const MONTH_YEAR_FORMAT_DISPLAY = 'MMM YYYY';
export const DATE_FORMAT_FILTER_CLASSIFIED = 'YYYY/MM/DD';

export const GOOGLE_API_KEY = 'AIzaSyDB0rBRjiWKAjX4BOM-m1wDV9OY8pmveqU';
//export const GOOGLE_API_KEY = 'AIzaSyAA7E4TKLRcuUUYwRMSU2Ya40oili06DY';

//export const GOOGLE_API_KEY = 'AIzaSyA5UK72INdLzG3sd1C2ALvVMxez9pflwTw';
//export const GOOGLE_API_KEY = 'AIzaSyBB2jUb3fOaMSR200XWi-zUYXiUMZjrAcw';

export const CHAT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT_DISPLAY_CHAT = 'h:mm A';

export const CHAT_TYPES = {
  BOOMIN: 'boomin',
  basic: 'basic',
  bringer_delivery: 'bringer_delivery',
  classified: 'classified',
  order_marketplace: 'order_marketplace',
  service_appointment: 'service_appointment',
};

export const RECENT_LOCATION_MAX = 10;
export const SEARCH_HISTORY_MAX = 10;

export const VERIFY_CODE_COUNT = 4;
export const OTP_RESEND_TIMER = 140;
//export const OTP_RESEND_TIMER = 20;

export const BOOKING_ENABLED_TIME = 12;
export const BOOKING_CANCELATION_TIME = 12;

export const MAX_CATEGORIES_SHOWN_CLASSIFEID_ADD = 6;

export const MAX_UPLOAD_IMAGES_CLASSIFIED = 12;

export const OUT_OF_STOCK_ITEM_VARIENT = 'outofstockvariant0001';

export const SEARCH_KEY_INTERVAL = 500;

export const BUTTON_TYPE = {
  GRAY_BORDER: 1,
  BLACK: 2,
  GREY_BORDER: 3,
  GREEN_BORDER: 4,
  BLACK_BORDER: 5,
};

export const FORM_TYPE = {
  INPUT: 'input',
  DROPDOWN: 'dropdown',
  TAGS: 'radio',
  MULTISLIDER: 'multislider',
  SNGLESLIDER: 'singleslider',
  DATE_PICKER: 'DATE_PICKER',
  DATE_RANGE: 'DATE_RANGE',
};

export const CLASSIFIED_FILTER_ATTRIBUTE = {
  SORTING: 'sorting',
  PRICE_RANGE: 'price_range',
  RADIUS: 'radius',
  START_DATE: 'start_date',
  END_DATE: 'end_date',
};

export const CATEGORY_DISPLAY = {
  LIST: 'list',
  GRID: 'grid',
  GRID_LARGE: 'gridLarge',
};

export const KEYBOARD_TYPE = {
  DEFAULT: 'default',
  NUMBER: 'number',
  EMAIL: 'email',
};

export const FOOD_DELIVERY_VEHICLE_TYPE = 'Bike';

export const ORDER_STATUS = {
  COMPLETED: 'COMPLETED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  CANCELLED_BY_CUSTOMER: 'CANCELLED_BY_CUSTOMER',
  NO_DRIVER_FOUND: 'NO_DRIVER_FOUND',
  CANCELLED_DUE_TO_PAYMENT_ERROR: 'CANCELLED_DUE_TO_PAYMENT_ERROR',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING: 'PENDING',
  DISPATCHED: 'DISPATCHED',
  SCHEDULED: 'scheduled',
  ACCEPTED: 'accepted',
};

export const COORDINATES_DELTA = {
  latitudeDelta: 0.0043,
  longitudeDelta: 0.0034,
};

export const CAROUSEL = {
  ITEM_LIMIT: 5,
};

export const ORDER_CANCEL_ROLE = {
  USER: 'user',
  VENDOR: 'vendor',
};

export const UPLOAD_PHOTOS_FOR = {
  CLASSIFIED: 'classified',
  TOPIC: 'topic',
};

export const EMPTY_VIEW_IMAGE = {
  PHOTO: 'photo',
  LOCATION: 'location',
  CARD: 'card',
};

export const USER_TYPES = {
  BASIC: 'basic',
  BOOMIN: 'boomin',
  VENDOR: 'vendor',
  BRINGER: 'bringer',
};

export const SOCIAL_LOGIN_TYPE = {
  FACEBOOK: 'facebook',
  GMAIL: 'gmail',
  APPLE: 'apple',
};

export const DELIVERY_STATUS = {
  HEADING_PICKUP: 'heading_pickup',
  HEADING_DROPOFF: 'heading_dropoff',
  arrived_dropoff: 'arrived_dropoff',
};

export const SERVICE_ITEM_TYPE = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  CANCELLED_BY_CUSTOMER: 'CANCELLED_BY_CUSTOMER',
};

export const IDENTIFIERS = {
  POPULAR_CATEGORIES_MARKETPLACE_HOME: 'POPULAR_CATEGORIES_MARKETPLACE_HOME',
  POPULAR_PRODUCTS_HOME: 'POPULAR_PRODUCTS_HOME',
  TOP_RATED_PRODUCTS_HOME: 'TOP_RATED_PRODUCTS_HOME',
  SUB_CATEGORY_CLASSIFIED: 'SUB_CATEGORY_CLASSIFIED',
  USER_PRODUCTS: 'USER_PRODUCTS',
  USER_PRODUCTS_ALL: 'USER_PRODUCTS_ALL',
  MY_CLASSIFIED: 'MY_CLASSIFIED',
  FAVOURITE_CLASSIFIED: 'FAVOURITE_CLASSIFIED',
  POPULAR_CATEGORIES_CLASSIFIED_HOME: 'POPULAR_CATEGORIES_CLASSIFIED_HOME',
  RECENTLY_ADDED_CLASSIFIED_HOME: 'RECENTLY_ADDED_CLASSIFIED_HOME',
  HELP_WANTED_CLASSIFIED_HOME: 'HELP_WANTED_CLASSIFIED_HOME',
  HELP_WANTED_CLASSIFIED_LIST: 'HELP_WANTED_CLASSIFIED_LIST',
  SEARCH_CLASSIFIED_LIST: 'SEARCH_CLASSIFIED_LIST',
  RECENTLY_ADDED_CLASSIFIED_LIST: 'RECENTLY_ADDED_CLASSIFIED_LIST',
  RECENTLY_ADDED_SERVICES_LIST: 'RECENTLY_ADDED_SERVICES_LIST',
  MOST_BOOKED_SERVICES_LIST: 'MOST_BOOKED_SERVICES_LIST',
  ALL_CATEGORIES_CLASSIFIED: 'ALL_CATEGORIES_CLASSIFIED',
  ALL_CATEGORIES_MARKETPLACE: 'ALL_CATEGORIES_MARKETPLACE',
  ALL_CATEGORIES_SERVICES: 'ALL_CATEGORIES_SERVICES',
  POPULAR_PRODUCTS_MARKETPLACE: 'POPULAR_PRODUCTS_MARKETPLACE',
  REPORT_TYPE_CLASSIFIED: 'REPORT_TYPE_CLASSIFIED',
  SEARCHED_PRODUCTS: 'SEARCHED_PRODUCTS',
  TOP_RATED_PRODUCTS_MARKETPLACE: 'TOP_RATED_PRODUCTS_MARKETPLACE',
  FAVORITE_PRODUCTS: 'FAVORITE_PRODUCTS',
  CART_PRODUCTS: 'CART_PRODUCTS',
  PENDING_ORDERS: ORDER_STATUS.PENDING,
  DELIVERED_ORDERS: ORDER_STATUS.DELIVERED,
  CANCELLED_ORDERS: ORDER_STATUS.CANCELLED,
  ADVERTISING_LIST: 'ADVERTISING_LIST',
  UPDATE_ADVERTISMENT: 'UPDATE_ADVERTISMENT',
  CREATE_ADVERTISMENT: 'CREATE_ADVERTISMENT',
  ADD_ADVERTISMENT_DAYS: 'ADD_ADVERTISMENT_DAYS',
  MY_ADVERTISING_LIST: 'MY_ADVERTISING_LIST',
  ADVERTISING_DAYS: 'ADVERTISING_DAYS',
  POPULAR_CATEGORIES_SERVICES_HOME: 'POPULAR_CATEGORIES_SERVICES_HOME',
  RECENTLY_ADDED_SERVICES_HOME: 'RECENTLY_ADDED_SERVICE_HOME',
  MOST_BOOKED_SERVICES_HOME: 'MOST_BOOKED_SERVICES_HOME',
  FAVOURITE_SERVICES: 'FAVOURITE_SERVICES',
  PENDING_BOOKING: SERVICE_ITEM_TYPE.PENDING,
  COMPLETED_BOOKING: SERVICE_ITEM_TYPE.COMPLETED,
  CANCELLED_BOOKING: SERVICE_ITEM_TYPE.CANCELLED,
  CALENDAR_SLOTS: 'CALENDAR_SLOTS',
  CALENDAR_LIST: 'CALENDAR_LIST',
  REVIEW_ORDERS: 'REVIEW_ORDERS',
  REVIEW_BOOKINGS: 'REVIEW_BOOKINGS',
  REPORT_TYPE_SERVICES: 'REPORT_TYPE_SERVICES',
  REPORT_TYPE_RESTAURANTS: 'REPORT_TYPE_RESTAURANTS',
  REPORT_TYPE_DELIVERY: 'REPORT_TYPE_DELIVERY',
  TOP_RATED_RESTAURANTS: 'TOP_RATED_RESTAURANTS',
  ALL_RESTAURANTS: 'ALL_RESTAURANTS',
  TOP_RATED_RESTAURANTS_HOME: 'TOP_RATED_RESTAURANTS_HOME',
  ALL_RESTAURANTS_HOME: 'ALL_RESTAURANTS_HOME',
  SEARCHED_RESTAURANTS: 'SEARCHED_RESTAURANTS',
  FAVORITE_RESTAURANTS: 'FAVORITE_RESTAURANTS',
  CUISINES: 'CUISINES',
};

export const FOOD_COST_LEVEL_LIMIT = 3;

export const PROFILE_TABS = {
  PERSONAL_INFO: 1,
  EDUCATION: 2,
  EMPLOYMENT_INFO: 3,
  RECREATIONAL_ACTIVITIES: 4,
  MEDICAL_INFO: 5,
};

export const BUYING_FILTER = {
  PRICE: {
    HIGH_TO_LOW: { price_filter: 'DESC' },
    LOW_TO_HIGH: { price_filter: 'ASC' },
  },
};

export const SERVICE_FILTER = {
  SORT: {
    RECENT: { sorting: 'recent' },
    OLD_TO_NEWEST: { sorting: 'old-to-new' },
  },
  PRICE: {
    HIGH_TO_LOW: { sorting: 'high-low-price' },
    LOW_TO_HIGH: { sorting: 'low-high-price' },
  },
  RATING: {
    HIGH_TO_LOW: { sorting: 'high-low-rating' },
    LOW_TO_HIGH: { sorting: 'low-high-rating' },
  },
};

export const FILTER = {
  SORT: {
    RECENT: { sort: { createdAt: -1 } },
    OLD_TO_NEWEST: { sort: { createdAt: 1 } },
  },
  PRICE: {
    HIGH_TO_LOW: { sort: { price: -1 } },
    LOW_TO_HIGH: { sort: { price: 1 } },
  },
  RATING: {
    HIGH_TO_LOW: { rating_sort: 'DESC' },
    LOW_TO_HIGH: { rating_sort: 'ASC' },
  },
  MINIMUM_PRICE_BUYING: 0,
  MAXIMUM_PRICE_BUYING: 10000,
  MINIMUM_PRICE_CLASSIFIED: 0,
  MAXIMUM_PRICE_CLASSIFIED: 100000,
  MAXIMUM_PRICE_CLASSIFIED_PLUS: 1000000000,
  MINIMUM_PRICE_SERVICES: 0,
  MAXIMUM_PRICE_SERVICES: 10000,
  MINIMUM_DATE_CLASSIFIED: '1900-01-01',
  MAXIMUM_DATE_CLASSIFIED: '2025-01-01',
  DEFAULT_RADIUS: 10,
  MINIMUM_RADIUS: 1,
  MAXIMUM_RADIUS: 100,
};

//export const DEFAULT_RADIUS = 10;

/*
export const FILTERS = {
  recent: { createdAt: 1 },
  old_to_newest: { createdAt: -1 },
};
*/

export const DATE_PICKER_TYPE = {
  DATE: 'date',
  TIME: 'time',
  DATE_TIME: 'datetime',
  YEAR_MONTH: 'year_month',
  YEAR: 'YEAR',
};

export const PRESENT = 'Present';

export const MEDIA_PICKER_TYPE = {
  DOC: 'DOC',
  MEDIA_WITH_DOC: 'MEDIA_WITH_DOC',
  MEDIA: 'MEDIA',
};
export const IMAGE_COMPRESS_MAX_WIDTH = 720;
export const PICKER_TYPE = {
  // FOR CAMERA
  CAMERA: 'CAMERA',
  CAMERA_WITH_CROPPING: 'CAMERA_WITH_CROPPING',
  CAMERA_BINARY_DATA: 'CAMERA_BINARY_DATA',
  CAMERA_WITH_CROPPING_BINARY_DATA: 'CAMERA_WITH_CROPPING_BINARY_DATA',

  // FOR GALLERY
  GALLERY: 'GALLERY',
  GALLERY_WITH_CROPPING: 'GALLERY_WITH_CROPPING',
  GALLERY_BINARY_DATA: 'GALLERY_BINARY_DATA',
  GALLERY_WITH_CROPPING_BINARY_DATA: 'GALLERY_WITH_CROPPING_BINARY_DATA',

  // FOR MULTI PICK
  MULTI_PICK: 'MULTI_PICK',
  MULTI_PICK_BINARY_DATA: 'MULTI_PICK_BINARY_DATA',
};

export const DOCUMENT_MIME_ANDROID = {
  PDF: 'application/pdf',
  // XLS: 'application/vnd.ms-excel',
  // XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // CSV: 'text/csv',
};

export const MY_PERMISSIONS = {
  CAMERA: Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }),
};

export const DOCUMENT_MIME_IOS = {
  PDF: 'com.adobe.pdf',
  // XLS: 'com.microsoft.excel.xls',
  // XLSX: 'com.microsoft.excel.xlsx',
  // CSV: 'com.microsoft.excel.csv',
};

export const RESEND_TIMER = 30;
export const NAME_MAX_LENGTH = 20;
export const USERNAME_MAX_LENGTH = 20;
export const PASSWORD_MAX_LENGTH = 16;

export const CONTENT_TYPE = {
  PRIVACY: 'privacy',
  TERMS: 'terms-and-conditions',
  RETURN_POLICY: 'return_policy',
  ABOUT_US: 'about_us',
  FAQ: 'faq',
};

export const COUNTRY_CODE = '+1';

export const VEHICLES = 'vehicles';

export const ADMIN_HSO_MSG_OPTIONS = [
  {
    title: 'Message to User',
  },
  {
    title: 'Anonymous message to HSS',
  },
];
export const OTHER_USER_MSG_OPTIONS = [
  {
    title: 'Anonymous message to HSS',
  },
];

export const SEARCH_INPUT_TYPE = {
  LOCATION: 'location',
  SEARCH: 'search',
  HISTORY: 'history',
};

export const MODULE = {
  CLASSIFIED: 'classified',
  BUYING: 'buying',
  FOOD: 'food',
  TOPICS: 'topics',
  DELIVERY: 'delivery',
  SERVICE: 'service',
  ADVERTISMENT: 'advertisment',
};

export const ADS_CATEGORIES = {
  SERVICE: 'service',
  PRODUCT: 'product',
  FOOD: 'food',
};

export const CHAT_ROLE = {
  TOPIC_CREATOR: 'topic_creator',
  TOPIC_VIEWER: 'topic_viewer',
  FOOD: 'food',
  SERVICE: 'service',
  DELIVERY: 'delivery',
  BUYING: 'buying',
};

export const CLASSIFIED_TAG_TYPE = {
  TAG: 'tag',
  CATEGORY: 'category',
  SUB_CATEGORY: 'sub_category',
};

export const COST_TYPE = {
  FREE: 'free',
  PAID: 'paid',
};

export const COMMUNICATION_MEDIUM = {
  AUDIO: 'audio',
  VIDEO: 'video',
};

export const ID_TYPE = {
  ORDER: 'order',
  DELIVERY: 'delivery',
  CONSULTANCY: 'consultancy',
  SERVICE: 'service',
};
export const CATEGORY_SCREEN_PARAMS = {
  SEARCH_CLASSIFIED: { _module: MODULE.CLASSIFIED, _flow: 'search' },
  SEARCH_TOPICS: { _module: MODULE.TOPICS, _flow: 'search' },
  ADD_CLASSIFIED: { _module: MODULE.CLASSIFIED, _flow: 'add' },
  SEARCH_BUYING: { _module: MODULE.BUYING, _flow: 'search' },
  SEARCH_BUYING_CATEGORY: { _module: MODULE.BUYING, _flow: 'category' },
  SEARCH_FOOD: { _module: MODULE.FOOD, _flow: 'search' },
  SEARCH_SERVICE: { _module: MODULE.SERVICE, _flow: 'search' },
  SEARCH_SERVICE_CATEGORY: { _module: MODULE.SERVICE, _flow: 'category' },
};

export const ADD_PRODUCT_ITEM_TYPE = {
  REMOVABLE: 1,
  SELECTABLE: 2,
};

export const RATING_TYPE = {
  RATING_INPUT: 1,
  RATING_WITH_COUNT: 2,
  RATING_WITHOUT_COUNT: 3,
  RATING_INPUT_WITH_TEXT: 4,
};

export const NOTIFICATION_IDENTIFIERS = {
  DRIVER_CANCELLED: 'driver_cancelled',
  DRIVER_FOUND: 'driver_found',
  ORDER_DELIVERED: 'order_delivered',
  DRIVER_ARRIVED: 'driver_arrived_for_pickup',

  // marketplace
  MARKETPLACE_ORDER_COMPLETED: 'market_place_order_completed',
  MARKETPLACE_ORDER_CANCELLED: 'market_place_order_cancelled',
  MARKETPLACE_PRODUCT_UPDATED: 'marketplace_product_updated',

  //service
  SERVICE_ORDER_CANCELLED: 'service_order_cancelled',
  SERVICE_BOOKING_REMINDER: 'service_booking_reminder',

  // advertising
  ADVERTISMENT_EXPIRY: 'advertisement_expiry',

  //invite friends
  INVITE_CODE_ACCEPTED: 'invite_code_accepted',

  //resturant
  RESTURANT_ORDER_COMPLETED: 'resturant_order_completed',
  RESTURANT_ORDER_CANCELLED: 'resturant_order_cancelled',
  RESTURANT_ORDER_DELIVERED: 'order_delivered_for_resturant',

  RESTURANT_DRIVER_FOUND: 'driver_found_for_resturant',
  RESTURANT_DRIVER_ARRIVED: 'driver_arrived_for_pickup_for_resturant',
};

export const STAR_SIZE = {
  SMALL: 15,
  MEDIUM: 19,
  LARGE: 25,
  XLARGE: 30,
  XXLARGE: 40,
};

export const DELIVERY_VEHICLE_SPEED = 40;

export const DRAWER_ACTION_TYPE = {
  BASIC: 'basic',
  BRINGER: 'bringer',
  BOOMIN: 'boomin',
  LOGOUT: 'logout',
};
export const ORDER_ITEM_TYPE = {
  PENDING: 'pending',
  COMPLETED: 'completed',
};

export const DRAWER_PREFERENCE = {
  LEFT: 'left',
  RIGHT: 'right',
};

export const DROPDOWN_IDENTIFIERS = {
  COUNTRIES: 'countries',
  CITIES: 'cities',
  STATES: 'states',
};

export const SHARE_MODULE_TYPE = {
  MARKETPLACE: 'marketplace',
  ADVERTISMENT: 'advertisement',
  CLASSIFIED: 'classified',
};

export const NOTIFICATIONS = {
  DELIVERY: 'delivery',
  MARKETPLACE: 'market_place',
  RESTAURANT: 'resturant',
  SERVICE: 'services',
  CLASSIFIED: 'classified',
  ADVERTISMENT: 'advertisements',
  GENERAL: 'general',
};
