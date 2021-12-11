import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(12),
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: Metrics.ratio(10),
  },
  text: { fontSize: Fonts.size.size_16, textAlign: 'left' },
});
