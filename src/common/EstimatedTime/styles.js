import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  estimatedTime: {
    backgroundColor: Colors.white,
    padding: Metrics.smallMargin,
    borderRadius: Metrics.ratio(15),
    alignSelf: 'flex-start',
  },
});
