import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.ratio(10),
    marginTop: Metrics.ratio(12),
  },
});
