import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  trendingProductContainer: {
    height: Metrics.ratio(180),
    borderRadius: Metrics.ratio(25),
    width: Metrics.screenWidth - Metrics.ratio(40),
    marginHorizontal: Metrics.mediumMargin,
    padding: Metrics.ratio(18),
    justifyContent: 'flex-end',
    marginTop: Metrics.ratio(29),
    marginBottom: Metrics.ratio(2),
  },
  trendingProductImage: {
    height: Metrics.ratio(180),
    width: Metrics.screenWidth - Metrics.ratio(40),
    borderRadius: Metrics.ratio(25),
  },
});
