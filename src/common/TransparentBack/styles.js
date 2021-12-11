import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  buttonView: {
    width: Metrics.ratio(36),
    height: Metrics.ratio(36),
    borderRadius: Metrics.ratio(18),
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
