import { Platform, StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  img: {
    height: Metrics.ratio(18),
    width: Metrics.ratio(18),
    tintColor: Colors.white,
  },
  container: {
    shadowColor: 'rgba(0, 0, 0, 0.21)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 12,
    shadowOpacity: 1,
    // backgroundColor: Colors.primary,
    elevation: 9,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
    marginRight: 20,
    marginBottom: 20,
  },
  countContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  count: {
    fontSize: Fonts.size.size_12,
    color: Colors.primary,
    fontFamily: Fonts.type.bold,
    marginBottom: Platform.select({ android: 1 }),
  },
});
