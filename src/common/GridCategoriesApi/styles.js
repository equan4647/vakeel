import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  gridSeparator: {
    width: Metrics.ratio(9),
    height: '100%',
  },
  listContainer: { paddingHorizontal: Metrics.mediumMargin },
  contentContainerStyle: {
    marginTop: Metrics.baseMargin,
    paddingRight: Metrics.ratio(30),
  },
  headingContainer: {
    marginHorizontal: Metrics.mediumMargin,
    marginTop: Metrics.ratio(24),
  },
});
