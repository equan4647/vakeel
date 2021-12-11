import { useFocusEffect } from '@react-navigation/native';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { FixHeaderParallax } from '../../common';
import { AppStyles, Metrics } from '../../theme';
import { Util } from '../../utils';

const ParallaxScrollView = ({
  headerHeight,
  transparentBack,
  headerRight,
  children,
  headerTitle,
  contentContainerStyle,
}) => {
  const [scrollY] = React.useState(new Animated.Value(0));

  let barStyle = 'dark';
  let scrollOffset = 0;

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        setBarStyle();
      }, 200);
      return () => {
        barStyle = 'dark';
        Util.setStatusBarStyle('dark-content');
      };
    }, [])
  );

  const onScrollView = e => {
    const offset = e.nativeEvent.contentOffset.y;
    setBarStyle(offset);
  };

  const setBarStyle = (offset = scrollOffset) => {
    if (barStyle === 'dark' && offset < headerHeight) {
      Util.setStatusBarStyle('light-content');
      barStyle = 'light';
    } else if (barStyle === 'light' && offset >= headerHeight) {
      Util.setStatusBarStyle('dark-content');
      barStyle = 'dark';
    }
    scrollOffset = offset;
  };

  // render fix header
  const renderFixHeader = () => {
    return (
      <FixHeaderParallax
        scrollY={scrollY}
        transparentBack={transparentBack}
        headerRight={headerRight}
        headerHeight={headerHeight}
        title={headerTitle}
      />
    );
  };

  return (
    <>
      <Animated.ScrollView
        style={AppStyles.flex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false, listener: onScrollView }
        )}
        bounces={false}
      >
        {children}
      </Animated.ScrollView>
      {renderFixHeader()}
    </>
  );
};

ParallaxScrollView.propTypes = {
  headerHeight: PropTypes.any,
  headerRight: PropTypes.func,
  transparentBack: PropTypes.bool,
  headerTitle: PropTypes.string,
  contentContainerStyle: ViewPropTypes.style,
};
ParallaxScrollView.defaultProps = {
  headerHeight: Metrics.imagesSwiperHeight,
  headerRight: undefined,
  transparentBack: true,
  headerTitle: '',
  contentContainerStyle: {},
};

export default ParallaxScrollView;
