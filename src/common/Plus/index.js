import React, { Fragment } from 'react';

import { ButtonView } from '../../components';
import { Colors, Images } from '../../theme';
import { Image, StyleSheet } from 'react-native';

const Plus = ({ tintColor, size, cross, onPress, style }) => {
  const Container = onPress ? ButtonView : Fragment;
  return (
    <Container {...{ onPress }}>
      <Image
        source={Images.icons.plus}
        style={StyleSheet.flatten([
          {
            tintColor: tintColor ?? Colors.primary,
            transform: [{ rotate: cross ? '45deg' : '0deg' }],
          },
          style,
        ])}
        resizeMode="contain"
      />
    </Container>
  );
};
export default Plus;
