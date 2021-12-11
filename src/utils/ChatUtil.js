import moment from 'moment';

function getDateWithFormat(date) {
  // ensure the date is displayed with today and yesterday
  return moment(date).calendar(null, {
    // when the date is closer, specify custom values
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: 'dddd',
    sameElse: 'ddd, D MMM',
  });
}

export default {
  getDateWithFormat,
};
