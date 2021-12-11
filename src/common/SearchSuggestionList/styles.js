import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  separatorStyle: {
    marginVertical: Metrics.ratio(26),
  },
  emptyViewText: {
    alignSelf: 'center',
    paddingBottom: Metrics.ratio(20),
    marginTop: Metrics.ratio(20),
  },
  errorView: { marginTop: Metrics.ratio(20) },
});
