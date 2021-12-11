import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: Metrics.mediumMargin,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridContainer: {
    // flexDirection: 'column',
    alignItems: 'center',
  },
  gridLargeContainer: {
    width: '50%',
    justifyContent: 'center',
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
  gridCircleLarge: {
    height: Metrics.scale(80),
    width: Metrics.scale(80),
    borderRadius: Metrics.scale(80),
    marginBottom: Metrics.ratio(11),
  },
  listCircle: {
    height: Metrics.scale(40),
    width: Metrics.scale(40),
    borderRadius: Metrics.scale(40),
  },
  textGrid: { fontSize: Fonts.size.size_13, maxWidth: Metrics.ratio(65) },
});
