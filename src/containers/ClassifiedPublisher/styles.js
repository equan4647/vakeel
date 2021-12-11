import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    // paddingTop: Metrics.navBarHeight,
  },
  textDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImageStyle: {
    marginRight: Metrics.ratio(7),
  },
  separatorStyle: {
    // marginTop: Metrics.ratio(23),
  },
  adsStyle: {
    flex: 1,
    // maxHeight: Metrics.ratio(250),
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.ratio(40),
  },
  adsContainerStyle: { paddingHorizontal: Metrics.mediumMargin },
  content: {
    paddingHorizontal: Metrics.mediumMargin,
    // marginTop: Metrics.mediumMargin,
  },
  listStyle: { paddingLeft: Metrics.mediumMargin },
  separator: { marginHorizontal: Metrics.mediumMargin },
  titleTextStyleCarousel: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
  },
  containerStyleTitle: { marginBottom: Metrics.baseMargin },
});
