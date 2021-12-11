import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  horizontalTitle: { marginBottom: Metrics.ratio(17) },
  barStyle: {
    // marginTop: Metrics.ratio(15),
    marginBottom: Metrics.ratio(15),
  },
  walletText: { marginLeft: Metrics.smallMargin },
  walletContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
  },
  cardContainer: {
    marginBottom: Metrics.mediumMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    marginBottom: Metrics.mediumMargin,
  },
});
