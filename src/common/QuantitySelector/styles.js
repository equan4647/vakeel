import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  countContainer: {
    width: Metrics.ratio(55),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonContainer: {
    backgroundColor: Colors.CountButton,
    height: Metrics.ratio(26),
    width: Metrics.ratio(26),
    borderRadius: Metrics.ratio(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: Fonts.size.size_20,
    marginBottom: Platform.select({ android: 3 }),
  },
});
