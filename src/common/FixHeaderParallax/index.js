import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { TransparentBack, OpaqueBack } from '..';
import { Text } from '../../components';
import styles from './styles';

const FixHeaderParallax = ({
  scrollY,
  headerHeight,
  transparentBack,
  headerRight,
  title,
}) => {
  // set nav bar opacity
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
  });

  // set back button opacity
  const imageTintColor = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)'],
  });

  // set title opacity
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight - 20, headerHeight],
    outputRange: [0, 0, 1],
  });

  return (
    <Animated.View style={[styles.transparentHeader, { backgroundColor }]}>
      {transparentBack ? (
        <TransparentBack {...{ imageTintColor }} />
      ) : (
        <OpaqueBack />
      )}

      <Animated.View style={{ flex: 1, opacity: titleOpacity }}>
        {title ? (
          <Text
            style={{ marginHorizontal: 16 }}
            numberOfLines={1}
            type="semiBold"
            size="size_22"
          >
            {title}
          </Text>
        ) : null}
      </Animated.View>
      {headerRight ? headerRight() : null}
    </Animated.View>
  );
};

FixHeaderParallax.propTypes = {
  scrollY: PropTypes.any.isRequired,
  headerHeight: PropTypes.number.isRequired,
  transparentBack: PropTypes.bool,
  headerRight: PropTypes.func,
  title: PropTypes.string,
};
FixHeaderParallax.defaultProps = {
  transparentBack: true,
  headerRight: undefined,
  title: '',
};
export default FixHeaderParallax;
