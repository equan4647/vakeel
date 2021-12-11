import { ProductUtil } from '.';
class BuyingCartUtil {
  getProductId = data => data?.product_id ?? '';

  getAttrId = data => data?.product_attribute_id ?? '';

  getQuantity = data => (data?.quantity ? Number(data?.quantity) : 0);

  getTitle = data => ProductUtil.getProductTitle(data?.item_detail) ?? '';

  getProductImageByAttr = item =>
    ProductUtil.getProductImageByAttr(item?.item_detail, this.getAttrId(item));

  getProductPrice = (item, format) =>
    ProductUtil.getProductPrice(
      item?.item_detail,
      this.getAttrId(item),
      format
    );

  getProductDiscountedPrice = (item, format) =>
    ProductUtil.getDiscountedPrice(
      item?.item_detail,
      this.getAttrId(item),
      format
    );

  getStockCount = data => {
    const attrId = this.getAttrId(data);
    const cartItem = data.item_detail?.product_attributes?.find(
      product => product?.product_attribute_id == attrId
    );

    return cartItem?.in_stock_quantity ?? 0;
  };

  isAvailable = data => Number(this.getStockCount(data)) > 0;

  getStoreId = data => {
    return data.item_detail?.store_id;
  };
}
export default new BuyingCartUtil();
