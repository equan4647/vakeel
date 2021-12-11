import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  headingContainer: {
    marginBottom: Metrics.ratio(28),
    backgroundColor: Colors.white,
  },
  heading: {
    fontSize: Fonts.size.size_30,
    fontFamily: Fonts.type.bold,
    marginBottom: Metrics.ratio(7),
  },
  containerStyle: {
    marginTop: Metrics.scaleVertical(22),
  },
});
