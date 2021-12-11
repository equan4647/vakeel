import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  gridSeparator: {
    width: Metrics.ratio(25),
    height: '100%',
  },
  gridLargeSeparator: {
    height: Metrics.scaleVertical(56),
    width: '100%',
  },
  listSeparator: { width: '100%', height: Metrics.mediumMargin },
  footerContainer: {
    flexDirection: 'row',
    paddingTop: Metrics.scaleVertical(56),
  },
});
