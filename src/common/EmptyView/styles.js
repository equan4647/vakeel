import { Platform, StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    // marginTop: Metrics.scaleVertical(0),
    marginTop: Metrics.scaleVertical(30),
  },
  arrow: { position: 'absolute', top: Platform.select({ android: 6, ios: 0 }) },
  image: {
    marginTop: Platform.select({
      android: Metrics.ratio(56),
      ios: Metrics.ratio(50),
    }),
  },
  text: {
    width: Metrics.scale(265),
    textAlign: 'center',
    fontSize: Fonts.size.size_16,
    color: Colors.warmGrey,
    lineHeight: Metrics.ratio(24),
  },
});
