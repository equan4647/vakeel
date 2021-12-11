import { Platform, StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  image: {
    marginVertical: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
  },
  cross: {
    marginVertical: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    marginLeft: Platform.select({ android: Metrics.ratio(11), ios: 0 }),
  },
});
