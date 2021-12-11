import React from 'react';
import PropTypes from 'prop-types';

import { Image, ButtonView } from '../../../components';
import { Images, Metrics } from '../../../theme';
import styles from './styles';

const ContactOptions = ({ onChat, onCall, style }) => (
  <>
    <ButtonView
      hitSlop={Metrics.hitSlop}
      style={styles.chatIcon}
      enableClick
      onPress={() => onChat?.()}
    >
      <Image source={Images.icons.chatDelivery} />
    </ButtonView>

    <ButtonView
      hitSlop={Metrics.hitSlop}
      enableClick
      onPress={() => onCall?.()}
    >
      <Image source={Images.icons.callDelivery} />
    </ButtonView>
  </>
);

ContactOptions.propTypes = {
  onChat: PropTypes.func,
  onCall: PropTypes.func,
};

export default React.memo(ContactOptions);
