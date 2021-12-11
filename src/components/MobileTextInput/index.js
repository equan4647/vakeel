// import React from 'react';
// // import {TextInput} from '../../common';
// import {COUNTRY_CODE} from '../../config/Constants';
// import {Colors, Fonts} from '../../theme';
// import {Util} from '../../utils';
// import {strings} from '../../utils/i18n';

// export default class M extends React.Component {
//   validatePhone = () => {
//     const value = this.mobileNumber.getValue();

//     const filtered = Util.getFilteredMobile(value);

//     if (filtered[0] && filtered[0].length < 10) {
//       return false;
//     }

//     return true;
//   };

//   formatText = (text) => {
//     // var x = text
//     //   .replace(/\D/g, '')
//     //   .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

//     // const value = !x[3]
//     //   ? x[1] + x[2]
//     //   : '+' + x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '');

//     var x = Util.getFilteredMobile(text);

//     const value = !x[2]
//       ? x[1]
//       : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');

//     return value;
//   };

//   render() {
//     const {value, inputRef, ...rest} = this.props;

//     return (
//       <TextInput
//         ref={(ref) => {
//           this.mobileNumber = ref;
//           inputRef && inputRef(ref);
//         }}
//         value={this.formatText(value)}
//         label={strings('app.mobile')}
//         keyboardType="phone-pad"
//         validateEmpty
//         // style={{marginTop: 20}}
//         formatText={this.formatText}
//         validateField={this.validatePhone}
//         validationMessage={strings('validation.phone')}
//         maxLength={14}
//         prefix={COUNTRY_CODE}
//         affixTextStyle={{
//           color: Colors.darkSlateBlue,
//           fontSize: Fonts.size.size_16,
//           fontFamily: Fonts.type.medium,
//         }}
//         {...rest}
//       />
//     );
//   }
// }
