/*
 * @flow
 * TODO: value * ratio difference between Android and iOS is of 2 value;
 * 16 in iOS is equals to 14 in android but this need to be verify.
 */

import { Dimensions, Platform, StatusBar } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Metrics } from '.';

const { width, height } = Dimensions.get('window');

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const isKitKatAbove = Platform.OS === 'android' && Platform.Version >= 19;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => (screenWidth / guidelineBaseWidth) * +size;
const scaleVertical = size => (screenHeight / guidelineBaseHeight) * size;

const ratio = (iosSize: number, androidSize: ?number, doScale = false) =>
  Platform.select({
    ios: doScale ? scaleVertical(iosSize) : iosSize, // iosSize,
    android: doScale
      ? scaleVertical(androidSize || iosSize)
      : androidSize || iosSize, // androidSize || iosSize,
  });

const generatedFontSize = (iosFontSize: number, androidFontSize: ?number) =>
  Platform.select({
    ios: iosFontSize,
    android: androidFontSize || iosFontSize,
  });

const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };
const hitSlop2 = { top: 20, bottom: 20, left: 20, right: 20 };
/*
const ratio = (iosSize: number, androidSize: ?number) =>
Platform.select({
ios: scaleVertical(iosSize),
android: androidSize || iosSize
});
*/

const NAVBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const NAVBAR_HEIGHT2 = Platform.OS === 'ios' ? (isIphoneX ? 56 : 56) : 56;
const STATUSBAR_HEIGHT_IOS = isIphoneX() ? 44 : 20;
const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? STATUSBAR_HEIGHT_IOS : StatusBar.currentHeight;
const BOTTOM_SPACE_IPHONE_X = ratio(34);
const navBarHeight = NAVBAR_HEIGHT + STATUSBAR_HEIGHT;

// new
const BOTTOM_SPACING = isIphoneX() ? BOTTOM_SPACE_IPHONE_X : ratio(20);
const BOTTOM_SPACING2 = isIphoneX() ? ratio(20) : 0;
const SIDE_MENU_BOTTOM_SPACING =
  Platform.OS === 'ios' ? (isIphoneX() ? 70 : 50) : 50;

const MESSAGE_BAR_HEIGHT =
  Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : StatusBar.currentHeight;

export default {
  MESSAGE_BAR_HEIGHT,
  BOTTOM_SPACING,
  BOTTOM_SPACING2,
  SIDE_MENU_BOTTOM_SPACING,
  ratio,
  scale,
  scaleVertical,
  screenWidth,
  screenHeight,
  generatedFontSize,
  isIphoneX,
  isKitKatAbove,
  marginMinus: ratio(-10),
  extraSmallMargin: ratio(4),
  extraaSmallMargin: ratio(3),
  smallMargin: ratio(8),
  lineHeight: Platform.OS === 'ios' ? ratio(18) : ratio(23),
  bigSmallMargin: ratio(12),
  baseMargin: ratio(16),
  mediumMargin: ratio(20),
  largeMargin: ratio(24),
  doubleBaseMargin: ratio(32),
  bottomSpaceIphoneX: BOTTOM_SPACE_IPHONE_X,
  statusBarHeightIos: STATUSBAR_HEIGHT_IOS,
  statusBarHeight: STATUSBAR_HEIGHT,
  navBarHeight,
  navBarHeightWithoutStatus: NAVBAR_HEIGHT,
  navBarHeightWithoutStatus2: NAVBAR_HEIGHT2,
  tabBarHeight: ratio(49),
  separatorHeight: ratio(1),
  // app specific
  productImageWidthCarousel: ratio((screenWidth - 75) / 2),
  productImageHeightCarousel: ratio(161),
  classifiedImageWidthCarousel: ratio((screenWidth - 75) / 2),
  classifiedImageHeightCarousel: ratio(161),
  imageAddWidth: ratio((screenWidth - 60) / 2),
  imageAddHeight: ratio((screenWidth - 60) / 2),
  productImageWidthList: ratio((screenWidth - 51) / 2),
  productImageHeightList: ratio(151),
  inlineMapHeight: ratio(216),
  multilineHeight: ratio(103),
  imagesSwiperHeight: screenHeight / 2.25,
  borderWidth: ratio(3),
  borderRadius12: ratio(12),
  borderRadius: ratio(12),
  backdropOpacity: 0.4,
  hitSlop,
  hitSlop2,
};
