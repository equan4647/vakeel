import { StyleSheet } from 'react-native';

import { Metrics, Colors } from '../../../theme';

export default StyleSheet.create({
  header: {
    position: 'absolute',
    left: Metrics.ratio(20),
    right: Metrics.ratio(20),
    top: Metrics.statusBarHeight + Metrics.baseMargin,
  },
  pickupAndDropOff: {
    marginTop: Metrics.baseMargin,
    backgroundColor: Colors.white,
    padding: Metrics.ratio(14),
  },
});
