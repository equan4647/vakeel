import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingBottom: Metrics.ratio(40),
  },
  searchInput: {
    marginTop: Metrics.ratio(7),
    marginHorizontal: Metrics.mediumMargin,
  },
});
