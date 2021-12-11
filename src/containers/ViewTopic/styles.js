import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.mediumMargin,
    paddingBottom: Metrics.mediumMargin,
  },
  title: {
    marginVertical: Metrics.ratio(10),
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_25,
  },
  barStyle: {
    marginTop: Metrics.ratio(25),
  },
  description: {
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(24),
    marginTop: Metrics.ratio(13),
  },
  overview: {
    paddingTop: Metrics.ratio(25),
    paddingBottom: Metrics.ratio(3),
  },
  threeDots: { marginLeft: Metrics.mediumMargin },
});
