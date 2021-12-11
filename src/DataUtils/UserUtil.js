import _ from 'lodash';
import { AppUtil } from '../utils';

class UserUtil {
  id = user => user?._id ?? '';

  avatar = user => user?.avatar ?? '';

  email = user => user?.email ?? '';

  firstName = user => user?.first_name ?? '';

  lastName = user => user?.last_name ?? '';

  full_name = user => `${this.firstName(user)} ${this.lastName(user)}`.trim();

  name = user => user?.name?.trim() ?? '';

  createdAt = user =>
    user?.created_at ? AppUtil.getFormattedDate(user.created_at) : '';

  countryCode = user =>
    user.country_code &&
    user.country_code !== null &&
    typeof user.country_code !== 'object'
      ? user.country_code
      : '';

  countryID = user =>
    user.country_id &&
    user.country_id !== null &&
    typeof user.country_id !== 'object'
      ? user.country_id
      : '';

  phone = user =>
    user.phone && user.phone !== null && typeof user.phone !== 'object'
      ? user.phone
      : '';

  mobile = user => user?.mobile ?? '';

  fullPhoneNumber = (user, space = ' ') =>
    user.country_code &&
    user.phone &&
    typeof user.country_code !== 'object' &&
    user.phone !== null &&
    user.country_code !== null
      ? `${user.country_code}${space}${user.phone}`
      : '';

  dob = user => user?.dob ?? '';

  getEducation = user => user?.education ?? [];

  getStripeCustID = user => user?.stripe_customer_details?.data?.id ?? '';

  getMedicalInfo = user => user?.medical_info ?? [];

  isPlatformSocial = user => !_.isEmpty(user?.platform_id) ?? false;

  getProfileProgress = user =>
    user?.profile_progress ? Number(user.profile_progress) / 100 : 0;

  isProfileComplete = user => this.getProfileProgress(user) == 1;

  notificationsEnabled = user => user?.send_notification;

  getRating = user => user?.rating || user?.avg_rating || 0;

  getRocketChatUserName = user => {
    return user?.rocket_chat_account?.data?.me?.username ?? '';
  };

  inviteCode = user => user?.invite_code ?? 'http://www.bizad.com/refferral';
}
export default new UserUtil();
