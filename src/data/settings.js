import { CONTENT_TYPE } from '../config/Constants';

const settingsData = [
  {
    name: 'Invite Friends',
    route: 'InviteFriends',
  },
  {
    name: 'Terms & Conditions',
    route: 'Content',
    params: { title: 'Terms & Conditions', identifier: CONTENT_TYPE.TERMS },
  },
  {
    name: 'Privacy Policy',
    route: 'Content',
    params: { title: 'Privacy Policy', identifier: CONTENT_TYPE.PRIVACY },
  },
  {
    name: 'Return Policy',
    route: 'Content',
    params: { title: 'Return Policy', identifier: CONTENT_TYPE.RETURN_POLICY },
  },
  {
    name: 'About Us',
    route: 'Content',
    params: { title: 'About Us', identifier: CONTENT_TYPE.ABOUT_US },
  },
  {
    name: 'FAQs',
    route: 'Content',
    params: { title: 'FAQs', identifier: CONTENT_TYPE.FAQ },
  },
];
export default settingsData;
