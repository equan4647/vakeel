import React from 'react';
import PropTypes from 'prop-types';

import { AppButton } from '..';
import { BUTTON_TYPE } from '../../config/Constants';

const SuccessButtons = props => {
  const { titleBtnOne, titleBtnTwo, onPressBtnOne, onPressBtnTwo } = props;
  return (
    <>
      <AppButton
        type={BUTTON_TYPE.GREEN_BORDER}
        title={titleBtnOne}
        onPress={onPressBtnOne}
      />

      <AppButton title={titleBtnTwo} onPress={onPressBtnTwo} />
    </>
  );
};

SuccessButtons.propTypes = {
  titleBtnOne: PropTypes.string,
  titleBtnTwo: PropTypes.string,
  onPressBtnOne: PropTypes.func,
  onPressBtnTwo: PropTypes.func,
};
SuccessButtons.defaultProps = {
  titleBtnOne: '',
  titleBtnTwo: '',
};

export default SuccessButtons;
