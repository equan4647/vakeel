import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.ratio(15),
  },
  apple: { marginTop: 0 },
  socialButton: { width: '47.75%' },
});
