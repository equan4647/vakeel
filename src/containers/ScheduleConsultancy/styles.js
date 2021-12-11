import { Platform, StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  topSpace: { marginTop: Metrics.ratio(18) },
  dateRangeSeparator: { marginTop: Metrics.doubleBaseMargin },
  contentContainer: { paddingBottom: Metrics.mediumMargin },
  paidConsultancy: { marginTop: Metrics.smallMargin },
  leftTextStyle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_13,
    marginLeft: Metrics.ratio(15),
    marginBottom: Platform.select({
      android: Metrics.ratio(4),
      ios: Metrics.ratio(1),
    }),
  }
});
