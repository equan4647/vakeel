import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  containerStyle: {
    width: Metrics.ratio(52),
    height: Metrics.ratio(32),
    borderRadius: Metrics.ratio(16),
    padding: Metrics.ratio(2),
  },
  circleStyle: {
    width: Metrics.ratio(28),
    height: Metrics.ratio(28),
    borderRadius: Metrics.ratio(14),
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
});
