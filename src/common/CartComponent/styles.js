import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  circle: {
    backgroundColor: Colors.primary,
    borderColor: Colors.white,
    borderRadius: Metrics.ratio(18),
    height: Metrics.ratio(36),
    width: Metrics.ratio(36),
    borderWidth: Metrics.ratio(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    backgroundColor: '#0665db',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: Metrics.ratio(20),
    width: Metrics.ratio(84),
  },
  count: {
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.type.medium,
    color: Colors.white,
  },
  increment: {
    paddingVertical: Metrics.ratio(10),
    paddingRight: Metrics.ratio(8),
    paddingLeft: Metrics.ratio(3),
  },
  derement: {
    paddingVertical: Metrics.ratio(16),
    paddingLeft: Metrics.ratio(8),
    paddingRight: Metrics.ratio(3),
  },
  countContainer: {
    width: Metrics.ratio(30),
    alignItems: 'center',
  },
});
