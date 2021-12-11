import * as yup from 'yup';
import _ from 'lodash';
import { strings } from './i18n';
import CCFieldFormatter from './CCFieldFormatter';

const displayMsg = (label, type) => {
  const _type = type ?? 'required';
  return strings(`validation.${_type}`, { key: 'label', value: label });
};

const Regex = {
  lowerCase: /^(?=.*[a-z])/,
  upperCase: /^(?=.*[A-Z])/,
  numeric: /^(?=.*[0-9])/,
  special: /^(?=.*[!@#$%^&*])/,
  url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
};
// ============validation object=====
export const Validation = {
  required: (title, type = 'required', valueType = 'string') => {
    if (valueType === 'object') {
      return yup[valueType]().nullable(true).required(displayMsg(title, type));
    }
    return yup[valueType]()
      .nullable(true)
      .trim?.()
      .required(displayMsg(title, type));
  },

  notRequired: () => yup.string().notRequired(),

  length: (_title, _length) =>
    yup
      .string()
      .required(displayMsg(_title))
      .test(
        'len',
        `Must be ${_length} characters`,
        val => val.length === _length
      ),

  lengthNumber: (_title, _length) =>
    yup
      .string()
      .required(displayMsg(_title))
      .test('len', `Must be ${_length} digits`, val => {
        return CCFieldFormatter.removeLeadingSpaces(val).length === _length;
      }),

  cardExpire: (_title, _length) =>
    yup
      .string()
      .required(displayMsg(_title))
      .test('len', `${_title} must be valid`, val => {
        if (val && val?.split('/').length === 2 && val?.split('/')[0] > 0) {
          const expireArray = val?.split('/');
          const month = expireArray[0];
          const year = expireArray[1];
          var d1 = new Date(`20${year}`, month);
          var today = new Date();
          return d1 >= today;
        }
        return false;
      }),

  numeric_range: (_title, max, min) =>
    yup
      .string(displayMsg(_title))
      .required(displayMsg(_title))
      .test(
        'range',
        `${_title} must be between ${min} - ${max}`,
        val => val <= max && val >= min
      ),

  email: () =>
    yup
      .string()
      .required(displayMsg('Email'))
      .email(displayMsg('Email', 'email')),

  password: title =>
    yup
      .string()
      .required(displayMsg(title))
      .matches(/^(?=.{8,})/, 'must be eight characters or longer')
      .matches(Regex.lowerCase, displayMsg('lowerCase', 'character'))
      .matches(Regex.upperCase, displayMsg('upperCase', 'character'))
      .matches(Regex.numeric, displayMsg('numeric', 'character'))
      .matches(Regex.special, displayMsg('special', 'character')),

  passwordMatch: ref =>
    yup
      .string()
      .required(displayMsg('Confrim Password'))
      .oneOf([yup.ref(ref), null], displayMsg('', 'confirm_password')),

  webUrl: (title, req) => yup.string().matches(Regex.url, displayMsg(_, 'url')),
};

// x=================x

const ValidationSchema = {
  login: yup.object().shape({
    email: Validation.email(),
    password: Validation.required('Password'),
  }),

  forgot: yup.object().shape({
    email: Validation.email(),
  }),
  password: yup.object().shape({
    password: Validation.password('Password'),
    confirm_password: Validation.passwordMatch('password'),
  }),

  changePass: yup.object().shape({
    old_password: Validation.required('Old Password'),
    new_password: Validation.password('New Password'),
    confirm_password: Validation.passwordMatch('new_password'),
  }),

  signup: yup.object().shape({
    first_name: Validation.required('First Name'),
    last_name: Validation.required('Last Name'),
    email: Validation.email(),
    referral_code: Validation.notRequired('Referrel Code'),
    password: Validation.password('Password'),
    confirm_password: Validation.passwordMatch('password'),
  }),

  signupSocial: yup.object().shape({
    first_name: Validation.required('First Name'),
    last_name: Validation.required('Last Name'),
    email: Validation.email(),
    referrel_code: Validation.notRequired('Referrel Code'),
  }),

  editProfile: yup.object().shape({
    first_name: Validation.required('First Name'),
    last_name: Validation.required('Last Name'),
    email: Validation.email(),
    phone: Validation.notRequired('Phone'),
    password: Validation.required('Password'),
  }),

  editProfileWithoutPass: yup.object().shape({
    first_name: Validation.required('First Name'),
    last_name: Validation.required('Last Name'),
    email: Validation.email(),
    phone: Validation.notRequired('Phone'),
  }),

  address: yup.object().shape({
    label: Validation.required('Label'),
    country: Validation.notRequired(),
    state: Validation.notRequired(),
    city: Validation.notRequired(),
    address_detail: Validation.notRequired(),
    note_to_rider: Validation.notRequired(),
    zip_code: Validation.notRequired(),
    is_default: Validation.notRequired(),
  }),

  reviewDetails: yup.object().shape({
    first_name: Validation.required('First Name'),
    last_name: Validation.required('Last Name'),
    phone: Validation.length('Phone', 10),
  }),

  setPrice: yup.object().shape({
    price: Validation.required('Price'),
    //price: Validation.numeric_range('Price', 1000, 10),
  }),

  confirmLocation: yup.object().shape({
    location: Validation.required('Location', 'required_select', 'object'),
  }),

  add_delivery: yup.object().shape({
    vehicle: Validation.required('Details'),
    type: Validation.required('Vehicle', 'required_select', 'object'),
  }),

  otp: yup.object().shape({
    otp: Validation.length('Code', 4),
  }),

  addAddress: yup.object().shape({
    firstName: Validation.required('First Name'),
    lastName: Validation.required('Last Name'),
    country: Validation.required('Country Name'),
    address: Validation.required('Address'),
    city: Validation.required('City'),
    province: Validation.required('Province'),
    postalCode: Validation.length('Postal Code', 5),
    phone: Validation.length('Phone', 10),
    email: Validation.email(),
  }),

  categorySpecs: yup.object().shape({
    make: Validation.required('Make'),
  }),

  report_ad: yup.object().shape({
    type: Validation.required(
      strings('app.problem_type'),
      'required_select',
      'object'
    ),
    description: Validation.required(strings('app.description')),
  }),

  report_advertisment: yup.object().shape({
    description: Validation.required(strings('app.description')),
  }),

  review: yup.object().shape({
    description: Validation.required(strings('app.description')),
  }),

  creditCardInput: yup.object().shape({
    card_number: Validation.required('Card Number'),
    name_on_card: Validation.required('Name on Card'),
    card_expiry: Validation.cardExpire('Card Expiry'),
    ccv: Validation.lengthNumber('CCV', 3),
  }),

  contactDetails: yup.object().shape({
    address: Validation.required('address', 'required_select', 'object'),
    web_url: Validation.webUrl(),
    phone: Validation.length('Phone', 10),
  }),

  editPhone: yup.object().shape({
    //phone: Validation.required('Phone'),
    phone: Validation.length('Phone', 10),
  }),

  createAd: yup.object().shape({
    title: Validation.required('Title'),
    description: Validation.required('Description'),
  }),

  adPrefrences: yup.object().shape({
    category: Validation.required('Category', 'required_select', 'object'),
    // product_type: Validation.required(
    //   'Product Type',
    //   'required_select',
    //   'object'
    // ),
    posting_days: Validation.required(
      'Posting days',
      'required_select',
      'object'
    ),
  }),

  addDays: yup.object().shape({
    posting_days: Validation.required(
      'Posting days',
      'required_select',
      'object'
    ),
  }),

  createTopic: yup.object().shape({
    category: Validation.required('Category', 'required_select', 'object'),
    topic_title: Validation.required('Topic Title'),
  }),

  scheduleConsultancy: yup.object().shape({
    title: Validation.required('Title'),
    agenda: Validation.required('Agenda'),
    date: Validation.required('Date'),
    start_time: Validation.required('Time From'),
    end_time: Validation.required('Time To'),
    is_video_consultancy: Validation.notRequired(),
    is_paid_consultancy: Validation.notRequired(),
  }),

  scheduleConsultancyWithCharges: yup.object().shape({
    title: Validation.required('Title'),
    agenda: Validation.required('Agenda'),
    date: Validation.required('Date'),
    start_time: Validation.required('Time From'),
    end_time: Validation.required('Time To'),
    is_video_consultancy: Validation.notRequired(),
    is_paid_consultancy: Validation.notRequired(),
    charges: Validation.required('Charges'),
  }),

  editEducation: yup.object().shape({
    school: Validation.required('School'),
    degree: Validation.required('Degree'),
    start_date: Validation.required('From'),
    end_date: Validation.required('To'),
  }),
  editMedicalInfo: yup.object().shape({
    diagonosis: Validation.required('Diagonosis'),
    from: Validation.required('From'),
    to: Validation.required('To'),
  }),

  editEmploymentInfo: yup.object().shape({
    total_work_exp: Validation.required('Total Work Experience'),
    company: Validation.required('Company'),
    job_title: Validation.required('Job Title'),
    start_date: Validation.required('Start Date'),
    end_date: Validation.required('End Date'),
  }),

  editRecreationalActivities: yup.object().shape({
    hobbies: Validation.required('Hobbies'),
    interests: Validation.required('Interests'),
  }),
};

export default ValidationSchema;
