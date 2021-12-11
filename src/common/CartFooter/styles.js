import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';
export default StyleSheet.create({
  subTotal: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginTop: Metrics.ratio(2),
  },
  delivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(14),
  },
});
