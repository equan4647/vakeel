import _, { isString } from 'lodash';
import {
  IDENTIFIERS,
  NOTIFICATIONS,
  NOTIFICATION_IDENTIFIERS,
} from '../config/Constants';
import { Util } from '../utils';

class NotificationsUtil {
  message = data =>
    `<span  style="font-size:16;line-height:23">${
      data?.msg
    }<span style="font-size:13;">   ${Util.getDateFromNow(
      data?.created_at
    )}</span></span>` ?? '';

  time(data) {
    return !_.isEmpty(data) && data.createdAt ? data.createdAt : Date.now();
  }

  avatar(data, identifier) {
    if (identifier === NOTIFICATIONS.MARKETPLACE) {
      return this.getProductImage(data);
    } else if (identifier === NOTIFICATIONS.SERVICE) {
      return this.getServiceImage(data);
    } else if (identifier === NOTIFICATIONS.RESTAURANT) {
      return this.getFoodImage(data);
    } else if (identifier === NOTIFICATIONS.CLASSIFIED) {
      return this.getClassifiedImage(data);
    }
  }

  getClassifiedImage(data) {
    return data && data.custom_data && _.isObject(data.custom_data)
      ? data?.custom_data?.images[0]?.image
      : '';
  }

  getProductImage(data) {
    if (
      data.target_identifier ===
      NOTIFICATION_IDENTIFIERS.MARKETPLACE_PRODUCT_UPDATED
    ) {
      return data?.custom_data?.product_attributes[0]?.images[0] ?? '';
    } else {
      return (
        data?.custom_data?.order_data[0]?.item_detail?.product_attributes[0]
          ?.images[0] ?? ''
      );
    }
  }

  getServiceImage(data) {
    return data?.custom_data?.service_obj?.images[0] ?? '';
  }

  getFoodImage(data) {
    return data?.custom_data?.items[0]?.image ?? '';
  }

  isDefault = data => data?.is_default == 1 ?? false;

  zipCode = data => data?.zip_code ?? '';

  state = data => data?.state ?? '';

  city = data => data?.city ?? '';

  country = data => data?.country ?? '';

  id = data => data?._id ?? '';

  lat = data => data?.lat ?? '';

  lng = data => data?.lng ?? '';

  addressDetail = data => data?.address_detail ?? '';

  noteToRider = data => data?.note_to_rider ?? '';
}
export default new NotificationsUtil();
