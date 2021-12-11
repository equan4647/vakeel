import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingBottom: Metrics.ratio(40),
  },

  successHeader: {
    flex: 1,
  },
  serviceName: {
    fontSize: Fonts.size.size_20,
    fontFamily: Fonts.type.semiBold,
    marginBottom: Metrics.ratio(5),
  },
  serviceSubText: {
    lineHeight: 15,
    fontSize: Fonts.size.size_16,
  },
  serviceNameContainer: {
    // flex: 1,
    marginTop: 34,
    alignItems: 'center',
  },
  buyerName: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
    marginTop: Metrics.ratio(5),
  },
  time: {
    fontSize: Fonts.size.size_16,
    marginTop: 5,
  },
  detailsContainer: { flex: 0.9 },
  userContainer: { alignItems: 'center' },
  emptySeperator: {
    flex: Metrics.isIphoneX() ? 0.8 : 0.2,
  },
});
