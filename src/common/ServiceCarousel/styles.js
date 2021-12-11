import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  separator: { height: '100%', width: Metrics.ratio(16) },
  headingContainer: {
    marginHorizontal: Metrics.mediumMargin,
    marginTop: Metrics.ratio(29),
  },
});
