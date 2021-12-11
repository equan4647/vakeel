const FALLBACK_CARD = { gaps: [4, 8, 12], lengths: [16], code: { size: 3 } };
const removeNonNumber = (string = '') => string.replace(/[^\d]/g, '');
const removeLeadingSpaces = (string = '') => string.replace(/ /g, '');

const limitLength = (string = '', maxLength) => string.substr(0, maxLength);
const addGaps = (string = '', gaps) => {
  const offsets = [0].concat(gaps).concat([string.length]);

  return offsets
    .map((end, index) => {
      if (index === 0) return '';
      const start = offsets[index - 1];
      return string.substr(start, end - start);
    })
    .filter(part => part !== '')
    .join(' ');
};

const formatNumber = number => {
  const numberSanitized = removeNonNumber(number);
  // const maxLength = card.lengths[card.lengths.length - 1];
  const lengthSanitized = limitLength(numberSanitized, FALLBACK_CARD.lengths);
  const formatted = addGaps(lengthSanitized, FALLBACK_CARD.gaps);
  return formatted;
};

const formatExpiry = expiry => {
  const sanitized = limitLength(removeNonNumber(expiry), 4);
  if (sanitized.match(/^[2-9]$/)) {
    return `0${sanitized}`;
  }
  if (sanitized.length > 2) {
    return `${sanitized.substr(0, 2)}/${sanitized.substr(2, sanitized.length)}`;
  }
  return sanitized;
};

const expireMonthYear = expire => {
  const expireArray = expire.split('/');
  return { year: expireArray[0], month: expireArray[1] };
};

const formatCVC = cvc => {
  //const maxCVCLength = card.code.size;
  return limitLength(removeNonNumber(cvc), FALLBACK_CARD.code.size);
};

export default {
  formatNumber,
  formatExpiry,
  formatCVC,
  removeLeadingSpaces,
  expireMonthYear,
  removeNonNumber,
};
