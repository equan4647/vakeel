import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../theme';

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.black,
    paddingHorizontal: Metrics.ratio(20),
    paddingVertical: Metrics.ratio(10),
    borderTopLeftRadius: Metrics.ratio(16),
    borderTopRightRadius: Metrics.ratio(16),
  },
});
