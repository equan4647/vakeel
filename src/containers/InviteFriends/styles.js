import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: Metrics.mediumMargin,
  },
  heading: {
    fontSize: Fonts.size.size_34,
    fontFamily: Fonts.type.bold,
    marginBottom: Metrics.ratio(4),
    textAlign: 'center',
  },
  text: {
    fontSize: Fonts.size.size_16,
    textAlign: 'center',
  },
  buttons: {
    paddingBottom: Metrics.BOTTOM_SPACING,
    paddingHorizontal: Metrics.mediumMargin,
    backgroundColor: Colors.white,
  },
  image: {
    width: Metrics.scale(279),
    height: Metrics.scale(268),
  },
});
