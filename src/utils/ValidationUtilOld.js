function validateEmail(text) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
}

function validatePassword(text, requiredPasswordLength) {
  const check = /^(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/; // Regex for pass at least 8 character, one uppercase and one special character
  return text && check.test(text);
  // if (requiredPasswordLength) {
  //   return text && text.length >= 8;
  // } else {
  //   return text;
  // }
}

function validateEmailMobile(text) {
  if (text.length < 7) {
    return false;
  }
  const mobile = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return mobile.test(text) || email.test(text);
}

function validatePhone(text) {
  if (text.length < 7) {
    return false;
  }
  const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  return re.test(text);
}

function validateAlphaNumeric(text) {
  const pattern = /^\d*[a-zA-Z]{1,}\d*/;
  return pattern.test(text);
}

function validateUrl(text) {
  const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  return pattern.test(text);
}

function validateFields(inputArray) {
  // set default state
  let isFormValid = true;

  // loop on input array to check validation
  inputArray.map((input) => {
    const isValidInput = input.validate();
    if (isValidInput === false) {
      isFormValid = false;
    }
  });
  // return value
  return isFormValid;
}

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateFields,
  validateAlphaNumeric,
  validateUrl,
  validateEmailMobile,
};
