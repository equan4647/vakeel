import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../theme';

export default StyleSheet.create({
  timeContainer: {
    marginBottom: Metrics.ratio(22),
    marginTop: Metrics.ratio(6),
  },
  container: { marginLeft: Metrics.bigSmallMargin, alignSelf: 'flex-start' },

  myContainer: { marginRight: Metrics.bigSmallMargin, alignSelf: 'flex-end' },

  time: { letterSpacing: 0.39 },
});
