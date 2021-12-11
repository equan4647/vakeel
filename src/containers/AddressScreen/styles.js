import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: Metrics.ratio(25),
    paddingBottom: Metrics.BOTTOM_SPACING,
  },
  separator: {
    marginTop: Metrics.ratio(25),
  },
  emptyStyle: { marginTop: Metrics.scaleVertical(48) },
});
