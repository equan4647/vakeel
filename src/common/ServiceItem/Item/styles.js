import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../../theme';

export default StyleSheet.create({
  listContainer: { flexDirection: 'row' },
  gridContainer: { width: Metrics.scale(150) },
  imgLarge: {
    borderRadius: Metrics.ratio(27),
    height: Metrics.scale(161),
    width: Metrics.scale(150),
    marginBottom: Metrics.bigSmallMargin,
    zIndex: 0,
  },
  imgSmall: {
    width: Metrics.ratio(80),
    height: Metrics.ratio(80),
    borderRadius: Metrics.ratio(10),
  },
  absFav: { position: 'absolute', top: 10, right: 10, zIndex: 1 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    top: Metrics.ratio(-6),
  },
  titleStyle: {
    maxWidth: Metrics.scale(216),
    fontSize: Fonts.size.size_16,
    marginBottom: 1,
  },
  contentStyle: { flex: 1, marginLeft: Metrics.baseMargin },
  locationImg: {
    height: Metrics.ratio(11),
    width: Metrics.ratio(9),
    marginRight: Metrics.ratio(6),
  },
  location: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  priceStyleList: {
    marginTop: Metrics.ratio(2),
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.type.bold,
  },
  priceStyle: {
    marginVertical: Metrics.ratio(4),
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.type.bold,
  },
});
