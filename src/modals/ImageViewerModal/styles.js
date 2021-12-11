import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: Platform.select({
      ios: 28,
      android: 8,
    }),
    right: 0,
    padding: 20,
    zIndex: 9999,
  },
  indicator: {
    alignSelf: 'center',
    position: 'absolute',
    top: Platform.select({
      ios: 40,
      android: 20,
    }),
    color: '#fff',
    fontSize: 18,
  },
});
