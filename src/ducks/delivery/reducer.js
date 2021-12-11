import {
  CANCEL_DELIVERY_ORDER,
  CREATE_DELIVERY,
  GET_ONGOING_ORDER,
  PLACE_DELIVERY_ORDER,
  RESET_CURRENT_DELIVERY,
  SET_DELIEVERY_PAYMENT_METHOD,
  UPDATE_CURRENT_DELIVERY,
  UPDATE_DELIVERY_INFO,
} from './types';

const initialState = {
  delivery_info: {},
  current_delivery: {},
  onGoingOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DELIVERY.SUCCESS:
      let _info = { ...state.delivery_info };
      if (
        action.data.delivery_charges != state.delivery_info.delivery_charges
      ) {
        delete _info?.paymentMethod;
      }

      return {
        ...state,
        delivery_info: { ..._info, ...action.data },
      };

    case SET_DELIEVERY_PAYMENT_METHOD:
      return {
        ...state,
        delivery_info: { ...state.delivery_info, paymentMethod: action.data },
      };

    case UPDATE_DELIVERY_INFO:
      return { ...state, delivery_info: action.data };

    case UPDATE_CURRENT_DELIVERY:
    case PLACE_DELIVERY_ORDER.SUCCESS:
      const cuurrenDeliveryObject =
        action.type === PLACE_DELIVERY_ORDER.SUCCESS
          ? action.data
          : { ...state.current_delivery, ...action.data };
      return {
        ...state,
        current_delivery: cuurrenDeliveryObject,
        ...action.otherInfo,
      };

    case GET_ONGOING_ORDER.REQUEST:
      return {
        ...state,
        current_delivery: action?.isResetData ? {} : state.current_delivery,
      };

    case RESET_CURRENT_DELIVERY:
    case GET_ONGOING_ORDER.FAILURE:
    case CANCEL_DELIVERY_ORDER.SUCCESS:
      return { ...state, current_delivery: {}, onGoingOrder: null };

    case GET_ONGOING_ORDER.SUCCESS:
      return {
        ...state,
        current_delivery: action.data,
        onGoingOrder: { isActive: true },
      };

    default:
      return state;
  }
};
