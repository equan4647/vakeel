import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  title: {
    marginBottom: Metrics.ratio(5),
  },
  item: { flexDirection: 'row', paddingVertical: 13 },
  itemTitle: { flex: 1, marginRight: 16 },
});
