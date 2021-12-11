import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-between',
  },
  flatlistContainer: {
    paddingBottom: Metrics.scaleVertical(58),
  },
  separator: { height: Metrics.scaleVertical(30) },
  viewProfile: {
    marginTop: Metrics.ratio(5),
    color: Colors.white,
    opacity: 0.42,
  },
  compProfileInst: {
    color: Colors.white,
    opacity: 0.42,
    marginRight: Metrics.smallMargin,
  },
  avatar: {
    height: Metrics.ratio(53),
    width: Metrics.ratio(53),
    borderRadius: Metrics.ratio(26.5),
    marginBottom: Metrics.ratio(13),
    marginTop: Metrics.scaleVertical(53) - Metrics.statusBarHeight,
    borderWidth: 0,
  },
  header: {
    paddingLeft: Metrics.mediumMargin,
    marginBottom: Metrics.largeMargin,
  },
  listImageContainer: {
    //width: 68,
    width: Metrics.scale(68),
    //justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  primary: {
    marginLeft: Metrics.mediumMargin,
    color: Colors.primary,
  },
  secondary: {
    marginLeft: Metrics.mediumMargin,
  },
  progress: { marginVertical: Metrics.smallMargin },
  itemSeparator: { paddingVertical: Metrics.baseMargin },
  imageItemText: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.semiBold,
    color: Colors.white,
  },
  dontHaveAccount: {
    fontSize: Fonts.size.size_14,
    lineHeight: Metrics.ratio(20),
    color: Colors.white,
  },
  signupdrawer: {
    fontSize: Fonts.size.size_14,
    lineHeight: Metrics.ratio(20),
    color: Colors.primary,
    fontFamily: Fonts.type.bold,
  },
  loginDrawer: {
    marginRight: Metrics.ratio(20),
    marginTop: Metrics.ratio(27),
    marginBottom: Metrics.ratio(13),
    height: Metrics.ratio(40),
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: Metrics.mediumMargin,
  },
});
