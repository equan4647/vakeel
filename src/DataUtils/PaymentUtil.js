class PaymentUtil {
  getId = item => item?.id ?? '';

  getBrand = item => item?.brand ?? '';

  getLast4Digits = item => item?.last4 ?? '';

  getCardNumber = item => `**** **** **** ${this.getLast4Digits(item)}`;
}
export default new PaymentUtil();
