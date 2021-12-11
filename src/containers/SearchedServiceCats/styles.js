import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  listContainer: {
    marginTop: Metrics.mediumMargin,
    paddingBottom: Metrics.tabBarHeight,
  },
  search: {
    marginTop: Metrics.ratio(7),
    marginHorizontal: Metrics.mediumMargin,
  },
});
