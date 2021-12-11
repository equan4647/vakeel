import { Platform, StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  listStyle: { marginTop: Metrics.ratio(25) },
  inputStyle: {
    marginTop: Metrics.ratio(6),
    paddingBottom: Platform.select({ android: Metrics.ratio(2) }),
  },
  locationButtonStyleMap: {
    paddingTop: Metrics.ratio(35),
    paddingBottom: Metrics.ratio(40),
  },
  locationButtonStyle: { paddingTop: Metrics.ratio(25) },
  errorView: { marginTop: Metrics.ratio(60) },
});
