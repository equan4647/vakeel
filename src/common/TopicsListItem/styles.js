import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  img: {
    height: Metrics.ratio(75),
    width: Metrics.ratio(75),
    borderRadius: Metrics.ratio(10),
    marginRight: Metrics.ratio(15),
    marginTop: Metrics.ratio(4),
    marginBottom: Metrics.ratio(2),
  },
  content: { justifyContent: 'space-between', flex: 1 },
});
