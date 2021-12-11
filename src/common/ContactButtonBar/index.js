import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { BottomButtonContainer, AppButton } from '..';
import { BUTTON_TYPE } from '../../config/Constants';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { AppUtil } from '../../utils';

const Titles = {
  message: strings('app.sms'),
  chat: strings('app.chat'),
  call: strings('app.call'),
};

const Button = ({ type, onPress }) => (
  <AppButton
    image={Images.icons[type]}
    type={BUTTON_TYPE.GREEN_BORDER}
    container={styles.appbutton}
    title={Titles[type]}
    {...{ onPress }}
  />
);

const ContactButtonBar = ({ style, onMessage, onChat, onCall }) => (
  <BottomButtonContainer style={[AppStyles.spreadRow, style]}>
    <Button type="message" onPress={onMessage} />
    <Button type="chat" onPress={() => AppUtil.doIfAuthorized(onChat)} />
    <Button type="call" onPress={onCall} />
  </BottomButtonContainer>
);

ContactButtonBar.propTypes = {
  style: ViewPropTypes.style,
  onMessage: PropTypes.func,
  onChat: PropTypes.func,
  onCall: PropTypes.func,
};
ContactButtonBar.defaultProps = {
  onMessage: () => {},
  onChat: () => {},
  onCall: () => {},
};
export default ContactButtonBar;
