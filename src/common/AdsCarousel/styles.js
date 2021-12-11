import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  headingContainer: {
    marginHorizontal: Metrics.mediumMargin,
    marginTop: Metrics.ratio(29),
  },

  listContainer: { paddingHorizontal: Metrics.mediumMargin },
  contentContainerStyle: {
    marginTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.mediumMargin,
  },
  separator: { height: '100%', width: Metrics.ratio(11) },
});
