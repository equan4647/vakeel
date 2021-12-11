import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  ratingHeading: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    marginBottom: Metrics.baseMargin,
  },
  priceRangeContainer: {
    marginBottom: Metrics.baseMargin,
  },
});
