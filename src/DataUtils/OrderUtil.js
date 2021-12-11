import { AppUtil, Util } from '../utils';

class OrderUtil {
  getId = data => data?._id ?? '';

  getAttrId = data => data?.product_attribute_id ?? '';

  getProductId = data => data?.product_id ?? '';

  isRated = data => data?.is_rated == 1;

  getRating = data => data?.rating_obj ?? {};

  getOrderData = data => data?.order_data ?? [];

  canCancel = data => data?.can_cancel ?? false;

  cancelledBy = data => data?.cancelled_by ?? '';

  getSum = data => Number(data?.products_sum) ?? '';

  getDeliveryCharges = data => Number(data?.delivery_charges) ?? '';

  getShippingInfo = data => data?.shipping_info ?? {};

  getStatus = data => data?.status ?? '';

  getUpdatedAt = data =>
    data?.updatedAt ? Util.getFullDateTime(data.updatedAt) : '';

  getCreatedAt = data =>
    data?.createdAt ? AppUtil.getFormattedDate(data.createdAt) : '';

  getCardInfo = data =>
    data?.stripe_response?.data?.payment_method_details?.card ?? {};

  isCardCharged = data => data?.card_charged ?? false;

  isWalletCharged = data => data?.wallet_charged ?? false;

  getAmountchargedFromWallet = data =>
    AppUtil.formatPrice(data?.wallet_charged_amount ?? 0);

  getAmountchargedFromCard = data =>
    AppUtil.formatPrice(data?.card_charged_amount ?? 0);

  getPriceToCharge = (data, format = false) => {
    const price = data?.price_to_charge ?? '';
    return format ? AppUtil.formatPrice(price) : Number(price).toFixed(2);
  };

  getAttributesByAttrId = item => {
    const attr_id = this.getAttrId(item);
    return item?.item_detail?.product_attributes?.filter(
      attrObj => attrObj?.product_attribute_id === attr_id
    )?.[0]?.attribute_values;
  };
}
export default new OrderUtil();
