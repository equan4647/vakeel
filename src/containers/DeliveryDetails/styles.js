import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  serviceIdContainer: {
    marginTop: Metrics.ratio(15),
  },
  bringer: {
    paddingTop: Metrics.ratio(16),
  },
  topSeparator: { marginTop: Metrics.ratio(10) },
  bottomSeparator: { marginTop: Metrics.ratio(20) },
  rateBringer: { paddingBottom: Metrics.BOTTOM_SPACING },

  pickAndDrop: { marginTop: Metrics.mediumMargin },
  delMethod: { marginTop: Metrics.ratio(15) },
});
