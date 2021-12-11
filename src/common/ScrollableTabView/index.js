import ScrollableTabComponent from 'react-native-scrollable-tab-view';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import ScrollableTabBar from './ScrollableTabBar';
import { Colors, Metrics } from '../../theme';
import styles from './styles';

const ScrollableTabView = ({
  children,
  forwardRef,
  containerStyle,
  tabBarContainerStyle,
  tabStyle,
  onChangeTab,
  isUnderlineFull,
  prerenderingSiblingsNumber,
  customUnderLineWidth,
  contentProps,
}) => {
  const underLineWidth = isUnderlineFull ? '70%' : Metrics.ratio(19);
  return (
    <ScrollableTabComponent
      tabBarTextStyle={styles.tabTextStyle}
      renderTabBar={() => (
        <ScrollableTabBar
          style={[styles.scrollableTabBar, tabBarContainerStyle]}
          selectedUnderline={[
            styles.selectedUnderline,
            { width: customUnderLineWidth || underLineWidth },
          ]}
          tabStyle={tabStyle}
        />
      )}
      tabBarUnderlineStyle={[styles.tabBarUnderlineStyle]}
      style={(styles.container, containerStyle)}
      ref={forwardRef}
      tabBarActiveTextColor={Colors.frogGreen}
      tabBarInactiveTextColor={Colors.black}
      {...{ onChangeTab, contentProps, prerenderingSiblingsNumber }}
    >
      {children}
    </ScrollableTabComponent>
  );
};

ScrollableTabView.propTypes = {
  containerStyle: ViewPropTypes.style,
  tabBarContainerStyle: ViewPropTypes.style,
  tabStyle: ViewPropTypes.style,
  onChangeTab: PropTypes.func,
  isUnderlineFull: PropTypes.bool,
  prerenderingSiblingsNumber: PropTypes.any,
  customUnderLineWidth: PropTypes.number,
  contentProps: PropTypes.object,
};
ScrollableTabView.defaultProps = {
  containerStyle: {},
  tabBarContainerStyle: {},
  tabStyle: {},
  onChangeTab: undefined,
  isUnderlineFull: false,
  prerenderingSiblingsNumber: 0,
  customUnderLineWidth: undefined,
};

export default ScrollableTabView;
