import { View } from 'react-native';
import React from 'react';

import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import styles from './styles';
import { Util } from '../../utils';

const OrderStatusTag = ({ status }) => {
  if (!status) {
    return null;
  }
  return (
    <View
      style={[styles.tagContainer, { borderColor: Util.getTintColor(status) }]}
    >
      <Text size="size_12" color={Util.getTintColor(status)}>
        {strings(`app.${status.toLowerCase()}`)}
      </Text>
    </View>
  );
};

export default OrderStatusTag;
