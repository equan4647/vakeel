import { StyleSheet } from 'react-native';
import { Metrics } from '../../../theme';

export default StyleSheet.create({
  marker: {
    width: Metrics.ratio(31),
    height: Metrics.ratio(38),
  },
  pin: {
    width: Metrics.ratio(36),
    height: Metrics.ratio(24),
  },
});
