import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  emptyView: {
    alignSelf: 'center',
    width: Metrics.screenWidth - Metrics.ratio(40),
    textAlign: 'center',
    paddingBottom: Metrics.mediumMargin,
  },
});
