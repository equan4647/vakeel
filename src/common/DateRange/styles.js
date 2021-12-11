import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'flex-end',
    justifyContent: 'center',
  },
  emptySeparator: { width: Metrics.ratio(9) },
  checkboxContainer: {
    marginTop: Metrics.ratio(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: { marginLeft: Metrics.ratio(10) },
});
