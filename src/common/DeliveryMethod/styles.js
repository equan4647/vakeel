import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  vehicleItem: { marginTop: Metrics.ratio(14) },
  bar: {
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
    paddingTop: Metrics.ratio(15),
  },
});
