import { StyleSheet, Platform } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.mediumMargin,
  },
  image: {
    width: Metrics.screenWidth,
    height: Metrics.ratio(359),
    borderBottomLeftRadius: Metrics.ratio(44),
    borderBottomRightRadius: Metrics.ratio(44),
  },
  productTitleContainer: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(11),
  },
  titleTextStyle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_25,
    lineHeight: Metrics.ratio(32),
    flex: 1,
    marginRight: Metrics.ratio(5),
  },
  priceTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_35,
    //marginTop: Metrics.ratio(2),
  },
  locationContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(4),
  },
  separatorStyle: {
    marginVertical: Metrics.ratio(25),
  },
  barStyle: {
    marginTop: Metrics.ratio(25),
  },
  productDescriptionTextStyle: {
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(22),
    marginTop: Metrics.ratio(13),
  },
  productDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(19),
  },
  productTitleText: {
    lineHeight: Metrics.ratio(22),
    fontSize: Fonts.size.size_16,
  },
  productValueText: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(22),
  },
  userDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameContainer: {
    marginLeft: Metrics.ratio(15),
    flex: 1,
  },
  userNameTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(22),
  },
  adsStyle: {
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.largeMargin,
  },
  adsContainerStyle: { paddingHorizontal: Metrics.mediumMargin },
  moreContainer: {
    position: 'absolute',
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth,
    paddingTop: Metrics.statusBarHeight,
    paddingRight: Metrics.mediumMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 1,
  },
  locationIcon: {
    height: Metrics.ratio(11),
    width: Metrics.ratio(9),
    marginRight: Metrics.ratio(6),
    top: Platform.select({ android: Metrics.ratio(4), ios: Metrics.ratio(2) }),
  },
  location: { flex: 1, marginRight: Metrics.smallMargin },
  titleTextStyleCarousel: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
  },
});
