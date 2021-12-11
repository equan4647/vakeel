import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../../components';
import { Metrics } from '../../theme';
import styles from './styles';

const HeaderRightText = ({ text, onPress, style, textStyle, disabled }) => (
  <TouchableOpacity
    style={[styles.container, style]}
    hitSlop={Metrics.hitSlop}
    {...{ onPress, disabled }}
  >
    <Text
      type="bold"
      size="size_14"
      style={[{ opacity: disabled ? 0.5 : 1 }, textStyle]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);
export default React.memo(HeaderRightText);
