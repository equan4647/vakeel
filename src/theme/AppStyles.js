// // @flow
import { Platform, StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../theme';

export default StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flex1: {
    flex: 1,
  },
  contentContainerStyle: { paddingBottom: Metrics.ratio(20) },
  contentContainerStyle2: { paddingBottom: Metrics.BOTTOM_SPACING },
  contentContainerStyle3: {
    paddingBottom: Metrics.BOTTOM_SPACING,
    paddingHorizontal: Metrics.ratio(20),
    paddingTop: Metrics.ratio(10),
  },
  backgroundColor: { backgroundColor: Colors.white },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: Metrics.mediumMargin,
  },
  horizontalTitle: {
    marginBottom: Metrics.ratio(17),
    marginTop: Metrics.ratio(25),
  },
  headerSpace: {
    paddingTop: Metrics.navBarHeight,
    backgroundColor: Colors.white,
  },
  inputContainerFilter: {
    paddingVertical: Platform.select({
      ios: Metrics.ratio(17),
    }),
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.lightBlueGrey,
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_13,
    textAlign: 'center',
  },
  formTopSpace: { marginTop: Metrics.screenHeight * (40 / 812) },
  inputErrorText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.size_12,
    color: 'red',
    marginLeft: Metrics.ratio(6),
  },
  spreadRow: { flexDirection: 'row', justifyContent: 'space-between' },
  spreadRowAligned: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spreadRowEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  alignCenterView: { justifyContent: 'center', alignItems: 'center' },
  spreadRowStart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  listContainer: {
    paddingTop: Metrics.mediumMargin,
    paddingBottom: Metrics.tabBarHeight,
  },
  row: { flexDirection: 'row' },
  rowAligned: { flexDirection: 'row', alignItems: 'center' },
  flatlist: {
    backgroundColor: Colors.white,
  },
  handleModal: {
    width: Metrics.ratio(29),
    height: Metrics.ratio(4),
    borderRadius: Metrics.ratio(2),
    backgroundColor: Colors.pinkishGrey,
  },
  headerRightContainerStyle: {
    marginRight: Metrics.mediumMargin,
    marginBottom: 2,
  },
  headerLeftContainerStyle: {
    paddingHorizontal: Platform.select({
      ios: Metrics.mediumMargin,
      android: Metrics.ratio(9),
    }),
  },
  headerTitleStyle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_22,
    marginHorizontal: Metrics.ratio(24),
    marginBottom: Platform.select({
      android: Metrics.ratio(3),
      ios: Metrics.ratio(0),
    }),
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: Colors.white,
  },
  subHeadLeftText: {
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.type.semiBold,
  },
  subHeadLeftText2: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
  },
  bar: {
    marginTop: 17,
    borderTopWidth: 1,
    borderColor: Colors.lightBlueGrey,
    paddingTop: 15,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 80,
    borderRightWidth: 80,
    borderBottomWidth: 160,
    borderLeftColor: Colors.transparent,
    borderRightColor: Colors.transparent,
    borderBottomColor: Colors.primary,
    // transform: [{ rotate: '270deg' }, { scaleY: 8 / 80 }],
    zIndex: 1,
  },

  leftInputTextStyle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_13,
    marginLeft: Metrics.ratio(15),
    marginBottom: Platform.select({
      android: Metrics.ratio(1),
      ios: Metrics.ratio(1),
    }),
  },

  emptyText: {
    fontSize: Fonts.size.size_15,
    fontFamily: Fonts.type.light,
    textAlign: 'center',
    marginVertical: Metrics.smallMargin,
  },
  privacyLink: {
    marginTop: Metrics.scaleVertical(78),
  },
  emptyViewImage: {
    marginTop: 0,
  },
  emptyContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Metrics.scaleVertical(100),
  },
});
