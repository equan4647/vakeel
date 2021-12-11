import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  loader: { paddingTop: Metrics.ratio(24), flex: 0 },
  content: { paddingTop: Metrics.bigSmallMargin },
});
