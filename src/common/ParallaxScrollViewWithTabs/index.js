import { useFocusEffect } from '@react-navigation/native';
import { Animated, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Metrics, AppStyles } from '../../theme';
import {
  ScrollableTabView,
  FixHeaderParallax,
  HeaderParallax,
} from '../../common';
import { Util } from '../../utils';
import styles from './styles';

const ParallaxScrollViewWithTabs = ({
  headerHeight,
  headerRight,
  transparentBack,
  data,
  renderHeader,
  renderHeaderBottomContent,
  labelKey,
  renderTabItem,
  customHeader,
  footerView,
  contentContainerStyle,
}) => {
  // init variables
  const [scrollY] = React.useState(new Animated.Value(0));
  //const headerHeight = Metrics.imagesSwiperHeight;
  const scrollTabsRef = React.useRef(null);
  const scrollViewRef = React.useRef(null);

  const tabsLength = data.length;
  let currentTab = 0;
  let headerContentHeight = 0;
  let tabsHeight = [];
  let offsetScrollTabsRange = [];
  let isScrolling = false;
  let isTabChanging = false;
  let isLoadingTabs = true;
  // change status bar color
  let barStyle = 'dark';
  let scrollOffset = 0;

  React.useEffect(() => {
    setTimeout(() => {
      setScrollTabsRange();
    }, 300);
  }, []);

  // focus for set status bar color
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        if (customHeader) {
          setBarStyle();
        }
      }, 200);
      return () => {
        if (customHeader) {
          barStyle = 'dark';
          Util.setStatusBarStyle('dark-content');
        }
      };
    }, [])
  );

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

  const setScrollTabsRange = () => {
    isLoadingTabs = false;
    let lastMin = headerHeight * -1;
    tabsHeight.map((itemHeight, index) => {
      let maxHeight;
      itemHeight = Math.ceil(itemHeight);
      if (index === 0) {
        maxHeight = itemHeight + headerContentHeight;
      } else if (index === tabsLength - 1) {
        maxHeight = lastMin + 1 + itemHeight + headerContentHeight;
      } else {
        maxHeight = lastMin + 1 + itemHeight;
      }
      offsetScrollTabsRange.push({
        min: index === 0 ? lastMin : lastMin + 1,
        max: maxHeight,
      });
      lastMin = maxHeight;
    });
  };

  // on scroll event
  const onScroll = e => {
    if (isTabChanging === false) {
      const offsetScroll = e.nativeEvent.contentOffset.y;
      let tabShowBeSelected = currentTab;
      for (let i = 0; i < offsetScrollTabsRange.length; i += 1) {
        const { min, max } = offsetScrollTabsRange[i];
        if (offsetScroll >= min && offsetScroll <= max) {
          tabShowBeSelected = i;
          break;
        }
      }
      if (tabShowBeSelected !== currentTab) {
        currentTab = tabShowBeSelected;
        scrollTabsRef.current.goToPage(tabShowBeSelected);
      }
    }

    // set staus bar color
    if (customHeader) {
      const offset = e.nativeEvent.contentOffset.y;
      setBarStyle(offset);
    }
  };

  const onLayoutHeaderContent = event => {
    headerContentHeight = event.nativeEvent.layout.height;
  };

  const onLayoutTabContent = (event, index) => {
    tabsHeight[index] = event.nativeEvent.layout.height;
  };

  const onScrollStart = () => {
    isScrolling = true;
  };

  const onScrollEnd = () => {
    isScrolling = false;
  };

  const onChangeTab = ({ i }) => {
    if (!isScrolling && !isLoadingTabs && i !== currentTab) {
      isTabChanging = true;
      const min = i === 0 ? headerContentHeight : offsetScrollTabsRange[i].min;
      scrollViewRef.current.scrollTo({ x: 0, y: min, animated: true });
      setTimeout(() => {
        isTabChanging = false;
        currentTab = i;
      }, 300);
    }
  };

  // render fix header
  const renderFixHeader = () => {
    if (customHeader) {
      return (
        <FixHeaderParallax
          scrollY={scrollY}
          headerHeight={headerHeight}
          headerRight={() => headerRight()}
        />
      );
    }
    return null;
  };

  // renderImage header
  const reanderImageHeader = () => {
    if (customHeader) {
      return (
        <HeaderParallax
          scrollY={scrollY}
          headerHeight={headerHeight}
          content={() => <>{renderHeader()}</>}
        />
      );
    }
    return null;
  };

  // render tabs
  const renderTabs = () =>
    data?.length > 0 ? (
      <ScrollableTabView
        forwardRef={scrollTabsRef}
        containerStyle={styles.scrollableTabView}
        tabBarContainerStyle={styles.tabBarContainerStyle}
        tabStyle={styles.tabStyle}
        onChangeTab={onChangeTab}
        isUnderlineFull
      >
        {data.map((item, index) => (
          <View
            key={index}
            tabLabel={item[labelKey]}
            style={styles.scrollTabViewDummyItem}
          />
        ))}
      </ScrollableTabView>
    ) : null;

  // render restturant categories
  const renderResturantCategories = () =>
    data.map((item, index) => (
      <View
        key={index}
        onLayout={e => {
          onLayoutTabContent(e, index);
        }}
      >
        {renderTabItem?.(item)}
      </View>
    ));

  // render scroll content
  const renderScrollContentHeader = () => {
    return (
      <View onLayout={onLayoutHeaderContent}>
        {customHeader ? (
          <View style={{ height: headerHeight - Metrics.navBarHeight }} />
        ) : null}
        {renderHeaderBottomContent()}
      </View>
    );
  };

  return (
    <>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, contentContainerStyle]}
        style={[AppStyles.flex, customHeader ? styles.scrollView : {}]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false, listener: onScroll }
        )}
        stickyHeaderIndices={[1]}
        ref={scrollViewRef}
        onMomentumScrollBegin={onScrollStart}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        onScrollBeginDrag={onScrollStart}
        bounces={false}
      >
        {renderScrollContentHeader()}
        {renderTabs()}
        {renderResturantCategories()}
        {footerView ? footerView() : null}
      </Animated.ScrollView>
      {reanderImageHeader()}
      {renderFixHeader()}
    </>
  );
};

ParallaxScrollViewWithTabs.propTypes = {
  headerHeight: PropTypes.any,
  headerRight: PropTypes.func,
  transparentBack: PropTypes.bool,
  data: PropTypes.array.isRequired,
  renderHeader: PropTypes.func,
  renderHeaderBottomContent: PropTypes.func.isRequired,
  labelKey: PropTypes.string.isRequired,
  renderTabItem: PropTypes.func.isRequired,
  customHeader: PropTypes.bool,
  footerView: PropTypes.func,
  contentContainerStyle: ViewPropTypes.style,
};
ParallaxScrollViewWithTabs.defaultProps = {
  headerHeight: Metrics.imagesSwiperHeight,
  headerRight: undefined,
  transparentBack: true,
  renderHeader: undefined,
  customHeader: true,
  footerView: undefined,
};

export default ParallaxScrollViewWithTabs;
