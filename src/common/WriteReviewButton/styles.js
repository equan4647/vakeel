import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  writeReviewTextStyle: {
    fontFamily: Fonts.type.semiBold,
    color: Colors.primary,
    marginLeft: Metrics.ratio(12),
  },
});
