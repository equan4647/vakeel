import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

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
  cartButtonTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_20,
    color: Colors.white,
  },
  appButtonText: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(28),
    alignSelf: 'center',
    color: Colors.white,
  },
  appButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    height: Metrics.ratio(50),
    borderRadius: Metrics.ratio(12),
    marginTop: Metrics.mediumMargin,
    paddingHorizontal: Metrics.mediumMargin,
    justifyContent: 'center',
  },
  // ratingList: { paddingHorizontal: 0 },
  ratingList: { marginTop: Metrics.ratio(28) },
  listStyle: { paddingHorizontal: Metrics.ratio(50) },
  quantitySeparator: { marginVertical: Metrics.largeMargin },
  quantityHeader: {
    marginBottom: Metrics.ratio(4),
    marginTop: Metrics.ratio(1),
  },
  availableQuantityContainer: { marginRight: Metrics.doubleBaseMargin },
  actionButton: {
    marginBottom: Metrics.BOTTOM_SPACING + Metrics.ratio(90),
  },
  quantityBarContainer: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(24),
    alignItems: 'center',
    borderTopWidth: Metrics.ratio(1),
    paddingTop: Metrics.ratio(24),
    borderColor: Colors.lightBlueGrey,
    //marginBottom: Metrics.ratio(10),
  },
  quantityLabel: { marginRight: Metrics.ratio(10) },
  titleTextStyleCarousel: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
  },
  emptyViewCarousel: { marginTop: Metrics.baseMargin * 1.5, paddingBottom: 0 },
  priceContainer: {
    flexDirection: 'row',
  },
  discountedPriceTextStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_13,
    textDecorationLine: 'line-through',
    marginLeft: Metrics.ratio(5),
    marginTop: Metrics.ratio(26),
  },
  carousalSeparator: {
    marginHorizontal: Metrics.ratio(20),
    marginTop: Metrics.ratio(30),
  },
  packageDetails: { paddingTop: Metrics.largeMargin },
  separator10: { height: Metrics.ratio(10) },
  content: { paddingBottom: Metrics.largeMargin },
});
