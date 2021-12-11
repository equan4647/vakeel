import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  text: {
    fontSize: Fonts.size.size_11,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
    marginBottom: Platform.select({ android: Metrics.ratio(1) }),
  },
});
