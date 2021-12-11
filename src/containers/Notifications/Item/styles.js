import { StyleSheet } from 'react-native';
import { Metrics } from '../../../theme';

export default StyleSheet.create({
  container: { flexDirection: 'row' },
  image: { width: 44, height: 44 },
  detailsContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: Metrics.ratio(12),
  },
  imageView: { marginTop: Metrics.ratio(2) },
  // time: { backgroundColor: 'red' },
});
