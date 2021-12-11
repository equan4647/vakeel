import React from 'react';
import PropTypes from 'prop-types';
import Spacer from 'react-native-keyboard-spacer';

import { Util } from '../../utils';

const KeyboardSpacer = ({ topSpacing, alwaysEnabled }) => {
  if (alwaysEnabled) {
    return <Spacer {...{ topSpacing }} />;
  } else {
    return Util.isPlatformIOS() ? <Spacer {...{ topSpacing }} /> : null;
  }
};

KeyboardSpacer.propTypes = {
  topSpacing: PropTypes.number,
  alwaysEnabled: PropTypes.bool,
};

KeyboardSpacer.defaultProps = {
  topSpacing: 0,
  alwaysEnabled: false,
};
export default React.memo(KeyboardSpacer);
