import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  //============
  bringerName: {
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(22),
  },
  bringerRating: {
    marginTop: Metrics.ratio(3),
    marginBottom: Metrics.ratio(7),
  },
  content: { flex: 1, marginLeft: Metrics.ratio(9) },
});
