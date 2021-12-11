import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  separatorStyle: {
    marginVertical: Metrics.ratio(13),
  },
  contentContainerStyle: {
    paddingVertical: Metrics.mediumMargin,
    paddingHorizontal: Metrics.largeMargin,
  },
});
