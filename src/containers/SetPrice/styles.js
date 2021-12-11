import { StyleSheet, Platform } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  leftTextStyle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_13,
    marginLeft: Metrics.ratio(15),
    marginBottom: Platform.select({
      android: Metrics.ratio(4),
      ios: Metrics.ratio(1),
    }),
  },
});
