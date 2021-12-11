import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Metrics.ratio(45),
  },
  icon: { marginRight: Metrics.smallMargin },
});
