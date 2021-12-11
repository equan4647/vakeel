import { StyleSheet } from 'react-native';
import { Metrics } from '../../../theme';

export default StyleSheet.create({
  container: { flexDirection: 'row' },

  contentStyle: {
    flex: 1,
    marginLeft: Metrics.baseMargin,
  },

  infoContainer: { flexDirection: 'row' },

  priceAndTitleContainer: { flex: 1, marginRight: Metrics.smallMargin },

  title: { marginBottom: Metrics.ratio(3) },

  favourite: { marginTop: Metrics.ratio(4) },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.bigSmallMargin,
  },

  location: {
    flex: 1,
    marginRight: Metrics.smallMargin,
    marginBottom: 1,
  },

  locationImg: {
    height: Metrics.ratio(11),
    width: Metrics.ratio(9),
    marginRight: Metrics.ratio(6),
  },
  imageView: { marginTop: Metrics.ratio(4) },
});
