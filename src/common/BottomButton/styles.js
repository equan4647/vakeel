import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  cancel: {
    color: Colors.primary,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(28),
    marginTop: Metrics.mediumMargin,
    marginRight: Metrics.mediumMargin,
  },
});
