import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  flatlist1: {
    marginTop: Metrics.ratio(25),
    paddingHorizontal: Metrics.mediumMargin,
  },
  flatlist2: {
    marginTop: Metrics.ratio(28),
    paddingHorizontal: Metrics.mediumMargin,
  },
  searchInput: {
    marginTop: Metrics.ratio(20),
  },
  headercontainerStyle: { marginBottom: Metrics.ratio(23) },
  itemStyle: { marginTop: 0, marginBottom: Metrics.ratio(23) },
  contentContainerStyle: {
    paddingTop: Metrics.mediumMargin,
    paddingBottom: Metrics.BOTTOM_SPACING,
    paddingHorizontal: Metrics.mediumMargin,
  },
  errorView: { marginTop: Metrics.ratio(60) },
});
