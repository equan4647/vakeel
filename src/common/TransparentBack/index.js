import React from 'react';
import { Animated } from 'react-native';

import { NavigationService } from '../../utils';
import { Metrics, Images } from '../../theme';
import { ButtonView } from '../../components';

const TransparentBack = ({ onPress, imageTintColor }) => (
  <ButtonView
    hitSlop={Metrics.hitSlop}
    onPress={onPress ?? NavigationService.goBack}
  >
    <Animated.Image
      source={Images.icons.backImage}
      style={{ tintColor: imageTintColor }}
    />
  </ButtonView>
);

export default React.memo(TransparentBack);
