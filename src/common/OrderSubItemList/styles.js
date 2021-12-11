import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  separatorStyle: { height: Metrics.ratio(30) },
  // container: { marginTop: Metrics.mediumMargin },
  storeName: {
    marginBottom: Metrics.mediumMargin,
    marginTop: Metrics.mediumMargin,
  },
});
