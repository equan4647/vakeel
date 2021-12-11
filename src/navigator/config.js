import * as React from 'react';
import { Platform } from 'react-native';
import { TransitionPresets, TransitionSpecs } from '@react-navigation/stack';

import {
  HeaderBackImage,
  NotificationIcon,
  TabHeaderLeft,
  TabIcon,
} from '../common';
import { AppStyles, Colors, Metrics } from '../theme';
import styles from './styles';
import { Text } from '../components';
import { strings } from '../utils/i18n';

export const screenOptions = () => ({
  headerBackTitleVisible: false,
  headerStyle: AppStyles.headerStyle,
  headerTitleAlign: 'center',
  headerLeftContainerStyle: AppStyles.headerLeftContainerStyle,
  headerRightContainerStyle: AppStyles.headerRightContainerStyle,
  headerBackImage: () => <HeaderBackImage />,
  headerTitleStyle: AppStyles.headerTitleStyle,
  ...TransitionPresets.SlideFromRightIOS,
});

export const modalOptions = () => ({
  headerBackImage: () => <HeaderBackImage isCross />,
  headerStyle: AppStyles.headerStyle,
  headerTitleStyle: AppStyles.headerTitleStyle,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerLeftContainerStyle: AppStyles.headerLeftContainerStyle,
  headerRightContainerStyle: AppStyles.headerRightContainerStyle,
  ...TransitionPresets.ModalSlideFromBottomIOS,
});

export const tabHeaderOptions = (module, isGuest) => {
  const width = isGuest
    ? Metrics.screenWidth - Metrics.ratio(40)
    : Metrics.screenWidth - Metrics.ratio(80);
  return {
    title: '',
    headerLeft: () => <TabHeaderLeft {...{ module, width }} />,
    headerRight: () => (isGuest ? null : <NotificationIcon {...{ module }} />),
  };
};

export const modalStackOptions = {
  ...TransitionPresets.ModalSlideFromBottomIOS,
  headerShown: false,
  gestureEnabled: false,
};

export const hideHeaderOptions = {
  headerShown: false,
};

export const transitionSpecSearch = {
  close: TransitionSpecs.FadeOutToBottomAndroidSpec,
  open: TransitionSpecs.FadeInFromBottomAndroidSpec,
};

export const transitionSpecDrawerStack = {
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: Platform.select({ android: 250, ios: 200 }) },
    },
    close: TransitionSpecs.TransitionIOSSpec,
  },
};

export const transitionSpecCall = {
  ...TransitionPresets.FadeFromBottomAndroid,
  transitionSpec: {
    open: {
      ...TransitionSpecs.RevealFromBottomAndroidSpec,
      animation: 'timing',
      config: { duration: 10, delay: 500 },
    },
    close: {
      ...TransitionSpecs.RevealFromBottomAndroidSpec,
      animation: 'timing',
      config: { duration: 10 },
    },
  },
};

export const tabScreenOptions = props => {
  const { route } = props;

  return {
    tabBarIcon: ({ focused }) => <TabIcon {...{ route, focused }} />,
    tabBarLabel: ({ color }) => (
      <Text style={[styles.tabbarLabel, { color }]}>
        {strings(`tabsTitle.${route.name}`)}
      </Text>
    ),
  };
};

export const tabBarOptions = {
  keyboardHidesTabBar: true,
  showLabel: true,
  activeTintColor: Colors.primary,
  inactiveTintColor: Colors.greyish,
  style: styles.tabContainer,
  tabStyle: styles.tabStyle,
};
