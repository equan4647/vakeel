import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  separator: {
    height: Metrics.ratio(1),
    backgroundColor: Colors.lightBlueGrey,
    marginTop: Metrics.ratio(17),
    marginBottom: Metrics.ratio(14),
  },
  container: {
    marginTop: Metrics.ratio(-10),
    // paddingBottom: Metrics.BOTTOM_SPACING,
  },
});
