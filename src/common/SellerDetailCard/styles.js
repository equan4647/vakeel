import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    marginTop: Metrics.mediumMargin,
    marginBottom: Metrics.ratio(23),
  },
  iconText: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.semiBold,
    marginLeft: Metrics.ratio(7),
  },
  lightText: { marginTop: Metrics.ratio(3) },
  name: {
    fontSize: Fonts.size.size_30,
    fontFamily: Fonts.type.semiBold,
    marginTop: Metrics.bigSmallMargin,
  },
  star: {
    marginTop: Metrics.ratio(18),
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.ratio(11),
  },
});
