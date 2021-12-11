// staging
// export const BASE_URL = 'http://node.cubix.co:3340';
export const BASE_URL = 'http://104.248.0.22:8000';
export const X_API_TOKEN = 'X-Access-Token';
export const X_DEVICE_ID = 'x-device-id';
export const GUEST_AUTH = 'Guest-Auth';

// export const SHARE_URL = `${BASE_URL}//share?app_name=bizad&module_type=marketplace&item_id=123`

// REQUEST TYPES
export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

export const LIMIT = 10;
export const API_TIMEOUT = 30000;
export const API = '/api/';
export const WEB_API = '/webapi/';
export const API_CLASSIFIED = '/api/classified/';
//export const CLASSIFIED_SHARE = `${BASE_URL}/classified/product-detail/`;

export const API_LOG = true;

// API CHAT ROUTES
export const API_CHAT_CREATE_ROOM = {
  route: `${API}create-chat-room`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// API GUEST TOKEN
export const API_GUEST_USER_TOKEN = {
  route: `${API}guest-token`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

// API CLASSIFED ROUTES
export const API_CLASSIFIED_HOME = {
  route: `${API_CLASSIFIED}home`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CLASSIFIED_RELATED_PRODUCTS = {
  route: `${API_CLASSIFIED}related_product`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CLASSIFIED_CATEGORIES = {
  route: `${API_CLASSIFIED}categories`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CLASSIFIED_LIST = {
  route: `${API_CLASSIFIED}products`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CLASSIFIED_REPORT_USER = {
  route: `${API_CLASSIFIED}report-user`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_CLASSIFIED_HELP_WANTED_LIST = {
  route: `${API_CLASSIFIED}help-wanted-products`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CLASSIFIED_ADD = {
  route: `${API_CLASSIFIED}product`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_CLASSIFIED_EDIT = {
  route: `${API_CLASSIFIED}product`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const API_CLASSIFIED_REPORT_TYPE = {
  route: `${API_CLASSIFIED}reports-type`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CLASSIFIED_REPORT_PRODUCT = {
  route: `${API_CLASSIFIED}report-product`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_MY_CLASSIFIED = {
  route: `${API_CLASSIFIED}my-products`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_FAVOURITE_CLASSIFIED = {
  route: `${API_CLASSIFIED}products`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CLASSIFIED_DELETE = {
  route: `${API_CLASSIFIED}product`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const API_GET_CLASSIFIED = {
  route: `${API_CLASSIFIED}product`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CLASSIFIED_CATEGORY_DETAIL = {
  route: `${API_CLASSIFIED}category`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_LIKE_UNLIKE_CLASSIFIED = {
  route: `${API_CLASSIFIED}like-unlike-product`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_CLASSIFIED_SEARCH_TAGS = {
  route: `${API_CLASSIFIED}autocomplete`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// API USER ROUTES
export const API_USER_LOGIN = {
  route: `${API}sign-in`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_USER_LOGOUT = {
  route: `${API}logout`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_PROFILE = {
  route: `${API}update-profile`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_USER_SIGNUP = {
  route: `${API}sign-up`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SOCIAL_AUTH = {
  route: `${API}social-login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_VERIFY_EMAIL = {
  route: `${API}verify-email`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_MARKETPLACE_HOME = {
  route: `${API}get-market-place-home`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_MARKETPLACE_RELATED_PRODUCTS = {
  route: `${API}related-products`,
  //route: `${API}category/products`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_MARKETPLACE_CATEGORIES_LIST = {
  route: `${API}category`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_MARKETPLACE_PRODUCT_LIST = {
  route: `${API}product`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_MARKETPLACE_PRODUCT_LIST_CATEGORIES = {
  route: `${API}category/products`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_VERIFY_PHONE = {
  route: `${API}authenticate-phone-check`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SEND_OTP = {
  route: `${API}resend-confirmation-code`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SEND_OTP_PHONE = {
  route: `${API}authenticate-phone`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_SET_NEW_PASSWORD = {
  route: `${API}change-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_RESEND_CODE = {
  route: `${API}resend-confirmation-code`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const API_CHANGE_PASSWORD = {
  route: `${API}change-password-request`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPLOAD_FILE = {
  route: `${API}upload-file`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

/*Adresses*/

export const API_ADD_ADDRESS = {
  route: `${API}shipping-info`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_ADDRESS = {
  route: `${API}shipping-info`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UPDATE_ADDRESS = {
  route: `${API}shipping-info`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_DELETE_ADDRESS = {
  route: `${API}shipping-info`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

/*locations*/
export const API_GET_LOCATIONS = {
  route: `${API}get-locations`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

/*search tags*/
export const API_SEARCH_TAGS = {
  route: `${API}product-tags`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

/*wishlist products*/
export const API_WISHLIST = {
  route: `${API}wish-list`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_PRODUCT_WISHLIST = {
  route: `${API}wish-list`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

/* product-rating*/
export const API_PRODUCT_REVIEWS = {
  route: `${API}product-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_PRODUCT_REVIEW = {
  route: `${API}product-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_PRODUCT_REVIEW = {
  route: `${API}product-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

/*cart*/
export const API_ADD_PRODUCT_TO_CART = {
  route: `${API}cart`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_PRODUCT_CART = {
  route: `${API}cart`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_DELETE_FROM_PRODUCT_CART = {
  route: `${API}cart`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

/*orders*/
export const API_GET_ORDERS = {
  route: `${API}order`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_RESTURANT_ORDERS = {
  route: `${API}resturant-order`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_FOOD_ORDER_REPORT = {
  route: `${API}resturant-report`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CHECKOUT = {
  route: `${API}order`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_PLACE_ORDER = {
  route: `${API}order`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_CANCEL_ORDER = {
  route: `${API}order`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

/*boomin user */
// export const API_GET_BOOMIN_USERS = {
//   route: `${WEB_API}business-user`,
//   access_token_required: true,
//   type: REQUEST_TYPE.GET,
// };

export const API_REPORT_BOOMIN_USERS = {
  route: `${API}report-marketplace-users`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

/* payment*/

export const API_GET_WALLET = {
  route: '/wallet/amount',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_ADD_PAYMENT_METHOD = {
  route: '/card/create',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_DELETE_PAYMENT_METHOD = {
  route: '/card/delete',
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_LIST_CARD = {
  route: '/card/list',
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

/* create advertising*/
export const API_CREATE_ADVERTISE = {
  route: `${API}advertisement`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

/* update advertising*/
export const API_UPDATE_ADVERTISE = {
  route: `${API}advertisement`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

/* advertising list */
export const API_GET_ADVERTISMENTS = {
  route: `${API}advertisements`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

/* my advertising list */
export const API_GET_MY_ADVERTISMENTS = {
  route: `${API}my-advertisements`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

/* advertisement view */
export const API_ADVERTISMENT_VIEW = {
  route: `${API}advertisement/view`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

/* advertisement click */
export const API_ADVERTISMENT_CLICK = {
  route: `${API}advertisement/click`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

/* advertisement stats */
export const API_ADVERTISMENT_STATS = {
  route: `${API}advertisement/stats`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

/* advertisement days */
export const API_ADVERTISMENT_GET_DAYS = {
  route: `${API}advertisement/settings`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_REPORT_ADVERTISMENT = {
  route: `${API}advertisement-report`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_CHECK_SOCIAL_USER = {
  route: `${API}check-third-party-user`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

/*delivery */

/*history */
export const API_GET_DELIVERY_HISTORY = {
  route: `${API}order-history`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_VEHICLES = {
  route: `${API}vehicle`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_CREATE_DELIVERY = {
  route: `${API}get-delivery-info`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_PLACE_DELIVERY_ORDER = {
  route: `${API}place-order`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_FIND_DRIVER = {
  route: `${API}find-driver-for-order`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_DELIVERY_ORDER = {
  route: `${API}delivery-order`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_ADD_DELIVERY_RATING = {
  route: `${API}order-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_DELIVERY_RATING = {
  route: `${API}order-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_GET_DELIVERY_REPORT_TYPES = {
  route: `${API}delivery-report-type`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_REPORT_DELIVERY_ORDERS = {
  route: `${API}delivery-report`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// services
export const API_SERVICES_HOME = {
  route: `${API}get-home`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SERVICES_CATEGORIES = {
  route: `${API}service-category`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SERVICES_LIST_CATEGORIES = {
  route: `${API}service`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SERVICES_SEARCH_TAGS = {
  route: `${API}service-tags`,
  // route: `${API}product-tags`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_LIKE_UNLIKE_SERVICES = {
  // route: `${API_CLASSIFIED}like-unlike-product`,
  route: `${API}favorite-service`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_FAVOURITE_SERVICES = {
  route: `${API}favorite-service`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_BOOK_APPOINTMENT = {
  route: `${API}service-booking`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_AVAILABLE_SLOTS = {
  route: `${API}service-available-slots`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_BOOKING_HISTORY = {
  route: `${API}service-booking`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_UPDATE_BOOKING = {
  route: `${API}service-booking`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_ADD_SERVICE_REVIEW = {
  route: `${API}service-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_SERVICE_REVIEW = {
  route: `${API}service-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_SERVICE_REVIEWS = {
  route: `${API}service-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SERVICE_REPORT_TYPE = {
  route: `${API}service-report-type`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_RESTAURANT_REPORT_TYPE = {
  route: `${API}resturant-report-type`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SERVICE_REPORT = {
  route: `${API}service-report`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

/*Food */
export const API_FOOD_HOME = {
  route: `${API}resturants-get-home`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_RESTAURANTS_LIST = {
  route: `${API}resturant`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_CUISINES = {
  route: `${API}cuisine`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_SEARCH_FOOD = {
  route: `${API}resturant-tags`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_TOGGLE_FAVORITE_RESTAURANT = {
  route: `${API}like-resturant`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_GET_FAVORITE_RESTAURANT = {
  route: `${API}like-resturant`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_GET_RESTAURANT_DETAIL = {
  route: `${API}get-resturant-items`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_RESTAURANT_ORDER_VALIDATION = {
  route: `${API}valid-resturant-order`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_POST_RESTAURANT_ORDER = {
  route: `${API}resturant-order`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_ADD_RESTAURANT_RATING = {
  route: `${API}resturant-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const API_UPDATE_RESTAURANT_RATING = {
  route: `${API}resturant-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.PATCH,
};

export const API_GET_RESTAURANT_RATING = {
  route: `${API}resturant-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

/*notifications*/

export const API_GET_NOTIFICATIONS = {
  route: `${API}notification-list`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_NOTIFICATIONS_COUNT = {
  route: `${API}notification-count`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const API_DRIVER_RAINTG_REVIEW = {
  route: `${API}order-rating`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
