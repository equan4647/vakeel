import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    marginVertical: Metrics.ratio(4),
    flexWrap: 'wrap',
  },
  tagItemContainer: {
    height: Metrics.ratio(4),
    width: Metrics.ratio(4),
    borderRadius: Metrics.ratio(2),
    backgroundColor: Colors.black,
    marginHorizontal: Metrics.ratio(4),
  },
  circle: {
    backgroundColor: Colors.black,
    height: Metrics.ratio(4),
    width: Metrics.ratio(4),
    borderRadius: Metrics.ratio(2),
    marginHorizontal: Metrics.ratio(4),
  },
});
