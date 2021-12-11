import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../../theme';

export default StyleSheet.create({
  container: { width: Metrics.classifiedImageWidthCarousel },
  title: { marginTop: Metrics.ratio(10) },
  locationImg: {
    height: Metrics.ratio(11),
    width: Metrics.ratio(9),
    marginRight: Metrics.ratio(6),
  },
  location: {
    flex: 1,
    lineHeight: Metrics.ratio(12),
    maxWidth: Metrics.classifiedImageWidthCarousel - Metrics.baseMargin,
    // backgroundColor: 'red',
    // paddingVertical: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    alignItems: 'center',
    marginTop: Metrics.ratio(4),
  },
  priceStyle: {
    marginVertical: Metrics.ratio(4),
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.type.bold,
  },
  favorite: { alignSelf: 'flex-end' },
});
