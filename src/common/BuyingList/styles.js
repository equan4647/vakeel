import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  separator: {
    width: '100%',
    height: Metrics.ratio(28),
  },
  container: {
    paddingHorizontal: Metrics.mediumMargin,
    backgroundColor: Colors.white,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
});
