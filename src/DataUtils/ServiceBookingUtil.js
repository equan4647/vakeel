import { AppUtil } from '../utils';
import ServicesUtil from './ServicesUtil';

class ServiceBookingUtil {
  getId = data => data?._id ?? '';

  getRating = data => data?.service_obj?.avg_rating ?? '';

  getServiceId = data => data?._id ?? '';

  isRated = data => data?.is_rated == 1;

  username = data => ServicesUtil.getVendorName(data?.service_obj ?? {});

  avatar = data => ServicesUtil.getVendorImage(data?.service_obj ?? {});

  price = data => ServicesUtil.price(data?.service_obj ?? {});

  title = data => ServicesUtil.title(data?.service_obj ?? {});

  start_time = data => data.start_time ?? '';

  end_time = data => data.end_time ?? '';

  isReviewed = data => data?.is_reviewed ?? false;

  rating = data => data?.review_obj?.rating ?? '';

  review = data => data?.review_obj?.review ?? '';

  reviewId = data => data?.review_obj?._id ?? '';

  reviewData = data => data?.review_obj ?? {};

  address = data => data?.address_obj ?? {};
}
export default new ServiceBookingUtil();
