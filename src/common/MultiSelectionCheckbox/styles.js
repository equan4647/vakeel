import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  title: {
    marginBottom: Metrics.ratio(5),
  },
  item: { flexDirection: 'row', paddingVertical: Metrics.ratio(13) },
  itemTitle: { flex: 1, marginRight: Metrics.baseMargin },
  exceptionView: { marginTop: Metrics.screenHeight / 3.2 },
});
