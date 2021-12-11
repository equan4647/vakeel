import React from 'react';
import { Pressable } from 'react-native';
import { Metrics } from '../../theme';

export default React.memo(({ children, ...rest }) => (
  <Pressable {...rest} hitSlop={Metrics.hitSlop}>
    {children}
  </Pressable>
));
