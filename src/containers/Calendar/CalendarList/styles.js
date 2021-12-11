import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../../theme';

export default StyleSheet.create({
  header: {
    // marginTop: Metrics.ratio(24),
    marginBottom: Metrics.ratio(18),
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
  },
  seperator: { height: Metrics.ratio(20) },
});
