import { StyleSheet, Platform } from 'react-native';
import { Fonts, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  locationIconStyle: {
    width: Metrics.ratio(12),
    height: Metrics.ratio(15),
    tintColor: Colors.black,
    marginTop: Platform.select({
      android: Metrics.ratio(3),
      ios: Metrics.ratio(2),
    }),
  },
  subContainer: {
    marginLeft: Metrics.ratio(10),
    flex: 1,
  },
  defaultContainer: {
    borderRadius: Metrics.ratio(5),
    width: Metrics.ratio(95),
    paddingHorizontal: Metrics.ratio(6),
    paddingTop: Metrics.ratio(3),
    paddingBottom: Metrics.ratio(5),
    marginTop: Metrics.smallMargin,
    backgroundColor: Colors.black,
    marginBottom: Metrics.ratio(2),
  },
  defaultTextStyle: {
    fontSize: Fonts.size.size_12,
    color: Colors.white,
  },
  actionButtonTextStyle: {
    color: Colors.primary,
    fontFamily: Fonts.type.bold,
  },
  delete: { marginLeft: Metrics.mediumMargin },
  actionButton: { marginTop: Metrics.ratio(4) },
  label: {
    marginBottom: Metrics.ratio(5),
    fontFamily: Fonts.type.bold,
  },
});
