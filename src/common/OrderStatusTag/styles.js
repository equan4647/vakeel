import { StyleSheet, Platform } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  tagContainer: {
    paddingHorizontal: Metrics.ratio(6),
    justifyContent: Platform.OS === 'android' ? 'flex-start' : 'center',
    height: Metrics.ratio(22),
    borderRadius: Metrics.ratio(5),
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.primary,
  },
});
