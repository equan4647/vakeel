import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  emptyView: { marginTop: Metrics.ratio(-7) },
  contentContainerStyle: {
    paddingTop: Metrics.ratio(30),
    paddingBottom: Metrics.ratio(30),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginHorizontal: Metrics.mediumMargin,
    marginVertical: Metrics.ratio(10),
  },
});
