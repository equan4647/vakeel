import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: { paddingTop: Metrics.ratio(12) },
  appButtonContainer: {
    marginBottom: Metrics.BOTTOM_SPACING + Metrics.ratio(5),
  },
  textInputTextStyle: {
    marginTop: Metrics.ratio(20),
  },
});
