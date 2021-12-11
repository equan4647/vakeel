import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../../theme';

export default StyleSheet.create({
  gridContainer: {
    alignItems: 'center',
  },
  circleCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCircle: {
    height: Metrics.ratio(60),
    width: Metrics.ratio(60),
    borderRadius: Metrics.ratio(30),
    marginBottom: Metrics.smallMargin,
  },
  textGrid: {
    fontSize: Fonts.size.size_13,
    width: Metrics.ratio(74),
  },
});
