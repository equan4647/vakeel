import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  back: {
    marginLeft: Metrics.ratio(14),
  },
  opaqueCircle: {
    width: Metrics.ratio(36),
    height: Metrics.ratio(36),
    borderRadius: Metrics.ratio(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
