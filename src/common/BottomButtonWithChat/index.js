import PropTypes from 'prop-types';
import React from 'react';

import { BottomButtonContainer, AppButton } from '..';
import { BUTTON_TYPE } from '../../config/Constants';
import { AppStyles, Images } from '../../theme';
import { AppUtil } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

const BottomButtonWithChat = ({
  title,
  onPress,
  onChat,
  style,
  renderRight,
  appButtonDisabled,
  ...rest
}) => {
  return (
    <BottomButtonContainer style={[AppStyles.rowAligned, style]}>
      <AppButton
        type={BUTTON_TYPE.GREEN_BORDER}
        image={Images.icons.chat}
        title={strings('app.chat')}
        container={styles.chatButton}
        onPress={() => AppUtil.doIfAuthorized(onChat)}
      />

      {renderRight ? (
        renderRight()
      ) : (
        <AppButton
          container={AppStyles.flex1}
          disabled={appButtonDisabled}
          {...{ title, onPress, ...rest }}
        />
      )}
    </BottomButtonContainer>
  );
};

BottomButtonWithChat.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  onChat: PropTypes.func,
  appButtonDisabled: PropTypes.bool,
};

BottomButtonWithChat.defaultProps = {
  title: strings('app.next'),
  onChat: undefined,
  appButtonDisabled: false,
};

export default BottomButtonWithChat;
