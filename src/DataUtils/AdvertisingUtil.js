import { func } from 'prop-types';
import { Util } from '../utils';

function adID(data) {
  return data?.id ?? '';
}

function title(data) {
  return data?.title ?? '';
}

function description(data) {
  return data?.description ?? '';
}

function image(data) {
  return data?.advertisement_images
    ? data?.advertisement_images[0].image_link
    : '';
}

function type(data) {
  return data?.module_type ?? '';
}

function address(data) {
  return data?.address ?? '';
}

function website(data) {
  return data?.ref_url ?? '';
}

function phone(data) {
  const code = data?.country_dial_code ?? '';
  const number = data?.phone_number ?? '';
  return `${code} ${number} `;
}

function totalDays(data) {
  return data?.remaining_days + data?.days_spent ?? '';
}

function userClicked(data) {
  return data?.click_count ?? '';
}

function userReached(data) {
  return data?.view_count ?? '';
}

function createdAt(data) {
  return data?.created_at
    ? Util.formatDate2(data?.created_at, 'MMM DD, YYYY, h:mm A')
    : '';
}

function daysRemaining(data) {
  const days = data?.remaining_days ?? 0;
  console.log('daysRemaining', days);
  const dayText = days < 1 ? 'Day' : 'Days';
  return `${days} ${dayText} Remaining` ?? '';
}

function daysSpent(data) {
  const days = data?.days_spent;

  const dayText = days === 1 ? 'Day' : 'Days';
  return `${days} ${dayText} Spent` ?? '';
}

function daysProgress(data) {
  const dats = data?.days_spent ?? 0;
  return dats / totalDays(data);
}

export default {
  adID,
  title,
  description,
  image,
  type,
  address,
  website,
  phone,
  totalDays,
  userClicked,
  userReached,
  createdAt,
  daysRemaining,
  daysSpent,
  daysProgress,
};
