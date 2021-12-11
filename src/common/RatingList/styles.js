import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  separator: { height: Metrics.ratio(18) },
  headingContainer: {
    marginBottom: Metrics.ratio(28),
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: Fonts.size.size_30,
    fontFamily: Fonts.type.bold,
    marginBottom: Metrics.ratio(7),
  },
});
