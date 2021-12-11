import { AppUtil } from '../utils';

function getRating(item) {
  return item?.rating ?? 0;
}

function getId(item) {
  return item?._id ?? '';
}

function getReview(item) {
  return item?.review ?? '';
}

function getUserId(item) {
  return item?.user_id ?? '';
}

function getUpdatedAt(item) {
  let _date = item?.updatedAt ?? item?.updated_at;
  return _date ? AppUtil.getFormattedDate(_date) : '';
}

function getCreatedAt(item) {
  return item?.createdAt ? AppUtil.getFormattedDate(item.createdAt) : '';
}

function getUserDetail(item) {
  const data = item?.customer_detail
    ? item?.customer_detail
    : item?.reviewer_data;

  return data ?? {};
}

export default {
  getRating,
  getReview,
  getUserId,
  getUpdatedAt,
  getCreatedAt,
  getUserDetail,
  getId,
};
