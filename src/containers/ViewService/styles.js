import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.mediumMargin,
    paddingTop: Metrics.ratio(18),
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
    marginTop: Metrics.ratio(6),
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.ratio(11),
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
  // userDetailContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // userNameContainer: {
  //   marginLeft: Metrics.ratio(15),
  //   flex: 1,
  // },
  // userNameTextStyle: {
  //   fontFamily: Fonts.type.bold,
  //   fontSize: Fonts.size.size_16,
  //   lineHeight: Metrics.ratio(22),
  // },
  adsStyle: {
    marginTop: Metrics.bigSmallMargin,
    marginBottom: Metrics.ratio(46),
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
  rating: { marginTop: Metrics.bigSmallMargin },
  serviceType: {
    marginBottom: Metrics.ratio(10),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.ratio(10),
  },
  timeText: {
    marginLeft: Metrics.ratio(8),
  },
  bottomBtnContainer: {
    flexDirection: 'row',
  },
  chatBtn: {
    paddingHorizontal: Metrics.ratio(20),
    marginRight: Metrics.ratio(10),
  },
  bookingBtn: {
    flex: 1,
  },
  ratingList: {
    paddingHorizontal: 0,
    paddingTop: Metrics.baseMargin,
    marginBottom: Metrics.ratio(30),
  },
  emptyViewCarousel: { marginTop: Metrics.baseMargin },
});
