/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  StackActions,
  CommonActions,
  DrawerActions,
} from '@react-navigation/native';
import { Keyboard } from 'react-native';

import React from 'react';
import { TabActions } from '@react-navigation/native';

import { tabHeaderOptions } from '../navigator/config';
import {
  HeaderRightImage,
  HeaderRightText,
  TabHeaderLeft,
  HeaderBackImage,
} from '../common';
import { AppStyles, Images, Metrics } from '../theme';
import { ButtonView } from '../components';
import styles from '../navigator/styles';
import { View } from 'react-native';
import { strings } from './i18n';
import { Util } from '../utils';
import { MODULE } from '../config/Constants';
import { useUserRole } from './CustomHooks';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function getNavigationRef() {
  return _navigator;
}

function navigate(routeName, params, stackName) {
  if (stackName) {
    _navigator.navigate(stackName, { screen: routeName, params });
  } else {
    _navigator.navigate(routeName, params);
  }
}

function replace(routeName, params) {
  _navigator.dispatch(StackActions.replace(routeName, params));
}

function push(routeName, params) {
  _navigator.dispatch(StackActions.push(routeName, params));
}

function pop(number) {
  _navigator.dispatch(StackActions.pop(number));
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop());
}

function getNavigator() {
  return _navigator;
}

function reset(name, params) {
  // _navigator.dispatch(
  //   StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName })],
  //   }),
  // );

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name, params }],
  });
  _navigator.dispatch(resetAction);
}

function jumpTo(routeName, params) {
  _navigator.dispatch(TabActions.jumpTo(routeName, params));
}

function getCurrentRoute() {
  return getNavigator().getCurrentRoute();
}

function getCurrentRouteName() {
  return getNavigator().getCurrentRoute()?.name;
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

function closeDrawer() {
  _navigator.dispatch(DrawerActions.closeDrawer());
}

function hideHeader(navigation) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
}

function setTabHeader(navigation, module) {
  const isGuest = useUserRole();
  React.useLayoutEffect(() => {
    navigation.setOptions(tabHeaderOptions(module, isGuest));
  }, [navigation, isGuest]);
}

function setHeaderWithOptionsReportAProblem(
  navigation,
  headerTitle,
  onPressReport = undefined,
  titleReport = strings('app.report_a_problem')
) {
  React.useLayoutEffect(() => {
    setOptionsReport(navigation, headerTitle, onPressReport, titleReport);
  }, []);
}

function setOptionsReport(
  navigation,
  headerTitle,
  onPressReport = undefined,
  titleReport = strings('app.report_a_problem')
) {
  const options = [titleReport, strings('app.cancel')];
  navigation.setOptions({
    title: headerTitle,
    headerRight: () => {
      if (onPressReport) {
        return (
          <HeaderRightImage
            img={Images.icons.more}
            onPress={() => {
              Util.showActionSheet(options, index => {
                if (index === 0) {
                  onPressReport();
                }
              });
            }}
          />
        );
      }
      return null;
    },
  });
}

function setOptionsHeader(
  navigation,
  title: String,
  options: Object,
  destructiveIndex = -1,
  deps = []
) {
  const onPress = () => Util.showMoreOptions(options, destructiveIndex);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () =>
        options ? (
          <HeaderRightImage img={Images.icons.more} {...{ onPress }} />
        ) : null,
    });
  }, [navigation, ...deps]);
}

function setAdvertismentHeader(navigation, onPress) {
  React.useLayoutEffect(() => {
    const _width = Metrics.screenWidth - 140;
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={AppStyles.rowAligned}>
          <ButtonView onPress={goBack} style={styles.advertisementBack}>
            <HeaderBackImage />
          </ButtonView>

          <TabHeaderLeft module={MODULE.ADVERTISMENT} width={_width} />
        </View>
      ),
      headerRight: () => (
        <HeaderRightText text={strings('app.my_ads')} {...{ onPress }} />
      ),
    });
  }, [navigation]);
}

function setTitle(navigation, title) {
  React.useEffect(() => {
    navigation.setOptions({ title });
  }, []);
}

function setHeader(navigation, title, headerRight, dependency = []) {
  React.useEffect(() => {
    navigation.setOptions({ title, headerRight });
  }, dependency);
}

function setAddHeader(navigation, title, onPress, dependency = []) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => (
        <HeaderRightImage img={Images.icons.plus} {...{ onPress }} />
      ),
    });
  }, dependency);
}

function setDeleteHeader(navigation, title, onPress) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () =>
        onPress && (
          <HeaderRightText
            text={strings('app.delete').toUpperCase()}
            {...{ onPress }}
          />
        ),
    });
  }, [navigation]);
}

function setCrossBackHeader(
  navigation,
  title = '',
  onPress = undefined,
  isCross = true,
  deps = [],
  otherNavOptions = {}
) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerLeft: () => (
        <ButtonView onPress={onPress || pop} hitSlop={Metrics.hitSlop}>
          <HeaderBackImage {...{ isCross }} />
        </ButtonView>
      ),
      // ...otherNavOptions,
    });
  }, [navigation, ...deps]);
}

function setFilterHeader(navigation, title, onPress) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => (
        <HeaderRightText
          text={strings('app.clear').toUpperCase()}
          {...{ onPress }}
        />
      ),
    });
  }, [navigation]);
}

function hideKeyboardBack(navigation) {
  navigation.addListener(
    'beforeRemove',
    e => {
      Keyboard.dismiss();
    },
    []
  );
}

function setRightHeader(
  navigation,
  title,
  rightText,
  onPressRight,
  rightTextProps = {},
  deps = []
) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerRight: () => (
        <HeaderRightText
          text={String(rightText).toUpperCase()}
          onPress={onPressRight}
          {...rightTextProps}
        />
      ),
    });
  }, [navigation, onPressRight, ...deps]);
}

// add other navigation functions that you need and export them

export default {
  getNavigationRef,
  replace,
  hideKeyboardBack,
  push,
  pop,
  jumpTo,
  setTopLevelNavigator,
  setOptionsReport,
  getCurrentRoute,
  getNavigator,
  navigate,
  reset,
  popToTop,
  goBack,
  closeDrawer,
  hideHeader,
  setTitle,
  setHeader,
  setTabHeader,
  setAddHeader,
  setFilterHeader,
  setAdvertismentHeader,
  setCrossBackHeader,
  setRightHeader,
  setHeaderWithOptionsReportAProblem,
  setOptionsHeader,
  setDeleteHeader,
  getCurrentRouteName,
};
