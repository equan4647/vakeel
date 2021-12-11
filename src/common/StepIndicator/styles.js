import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  circle: {
    height: Metrics.ratio(14),
    width: Metrics.ratio(14),
    borderRadius: Metrics.ratio(7),
  },
  line: {
    height: Metrics.ratio(1),
    flex: 1,
    marginHorizontal: Metrics.ratio(10),
  },
});
