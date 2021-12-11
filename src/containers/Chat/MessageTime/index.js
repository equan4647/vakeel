import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { TIME_FORMAT_DISPLAY_CHAT } from '../../../config/Constants';
import { Text } from '../../../components';
import { Util } from '../../../utils';
import styles from './styles';

const MessageTime = props => {
  const { isMine, datetime } = props;
  const styleTime = isMine ? styles.myContainer : styles.container;

  return (
    <View style={[styles.timeContainer, styleTime]}>
      <Text color="blueGrey" size="size_11" style={styles.time}>
        {Util.formatDate2(datetime, TIME_FORMAT_DISPLAY_CHAT)}
      </Text>
    </View>
  );
};

MessageTime.propTypes = {
  isMine: PropTypes.bool,
  isRead: PropTypes.bool,
  datetime: PropTypes.string,
};

MessageTime.defaultProps = {
  isMine: false,
  isRead: false,
};
export default React.memo(MessageTime);
