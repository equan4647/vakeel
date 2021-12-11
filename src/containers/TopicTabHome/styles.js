import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  bottom: {
    marginBottom: Metrics.ratio(29),
  },
  headingContainer: {
    marginHorizontal: Metrics.mediumMargin,
    marginTop: Metrics.ratio(22),
    marginBottom: Metrics.bigSmallMargin,
  },
  listContainer: { paddingHorizontal: Metrics.mediumMargin },
  searchInput: {
    marginTop: Metrics.ratio(7),
    marginHorizontal: Metrics.mediumMargin,
  },
  categoriesList: { marginTop: Metrics.ratio(4) },
  adsList: { marginTop: Metrics.bigSmallMargin },
});
