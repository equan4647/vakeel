import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './styles';

const HeaderParallax = ({ scrollY, headerHeight, content }) => {
  // translateY
  const translateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, headerHeight * -1],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
      pointerEvents="none"
    >
      {content()}
    </Animated.View>
  );
};

HeaderParallax.propTypes = {
  scrollY: PropTypes.any.isRequired,
  headerHeight: PropTypes.number.isRequired,
  content: PropTypes.func.isRequired,
};
HeaderParallax.defaultProps = {};
export default HeaderParallax;
