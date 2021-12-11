import { StyleSheet } from 'react-native';

import { Metrics } from '../../theme';

export default StyleSheet.create({
  header: {
    position: 'absolute',
    top: Metrics.statusBarHeight + Metrics.ratio(4),
    left: Metrics.mediumMargin,
  },
});
