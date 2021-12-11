import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  separator: { height: '100%', width: Metrics.ratio(11) },
  listContainer: {},
  contentContainerStyle: {
    marginTop: Metrics.baseMargin,
    paddingHorizontal: Metrics.mediumMargin,
  },
  headingContainer: {
    marginHorizontal: Metrics.mediumMargin,
    marginTop: Metrics.ratio(29),
  },
  emptyView: {
    alignSelf: 'center',
    width: Metrics.screenWidth - 40,
    textAlign: 'center',
    paddingBottom: 20,
  },
});
