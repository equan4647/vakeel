import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  contentContainerStyle: { paddingBottom: Metrics.ratio(29) },
  searchInput: {
    marginTop: Metrics.ratio(7),
    marginHorizontal: Metrics.mediumMargin,
  },
});
