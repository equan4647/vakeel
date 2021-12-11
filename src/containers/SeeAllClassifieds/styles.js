import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';
export default StyleSheet.create({
  listContainer: {
    paddingBottom: Metrics.BOTTOM_SPACING + Metrics.mediumMargin,
    marginTop: Metrics.baseMargin,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingBottom: Metrics.BOTTOM_SPACING + Metrics.mediumMargin,
  },
});
