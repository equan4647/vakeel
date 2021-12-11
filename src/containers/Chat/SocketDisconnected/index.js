import { View } from 'react-native';
import React from 'react';

import { strings } from '../../../utils/i18n';
import { Text } from '../../../components';
import styles from './styles';

const SocketDisconnected = props => {
  return (
    <View style={styles.container}>
      <Text
        textAlign="center"
        size="size_15"
        color="white"
        type="medium"
        style={styles.message}
      >
        {strings('socket.unable_to_connect')}
      </Text>
    </View>
  );
};

SocketDisconnected.propTypes = {};

SocketDisconnected.defaultProps = {};

export default SocketDisconnected;
