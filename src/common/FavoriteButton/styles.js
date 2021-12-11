import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  border: {
    width: Metrics.ratio(38),
    height: Metrics.ratio(38),
    borderWidth: 1,
    borderColor: Colors.lightBlueGrey,
    borderRadius: Metrics.ratio(19),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  circle: {
    width: Metrics.ratio(38),
    height: Metrics.ratio(38),
    borderRadius: Metrics.ratio(19),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});
