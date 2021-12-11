import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingVertical: Metrics.mediumMargin,
  },
  pickAndDropOffLocation: { marginTop: Metrics.ratio(18) },
  vehicleItem: {
    flex: 0,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.ratio(4),
  },
});
