import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  circle: {
    width: Metrics.ratio(22),
    height: Metrics.ratio(22),
    borderRadius: Metrics.ratio(11),
    backgroundColor: Colors.primary,
    borderWidth: Metrics.ratio(1.5),
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontSize: 10,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
    marginBottom: Platform.select({ android: Metrics.ratio(1) }),
  },
});
