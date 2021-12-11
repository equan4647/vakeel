import { StyleSheet } from 'react-native';
import { Metrics, AppStyles, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  serviceId: {
    marginTop: Metrics.ratio(15),
    fontSize: Fonts.size.size_16,
  },
  serviceIdContainer: {
    marginTop: Metrics.ratio(15),
  },
  serviceName: {
    fontSize: Fonts.size.size_20,
    marginBottom: Metrics.ratio(2),
  },
  description: {
    lineHeight: 18,
  },
  boominUser: {
    paddingTop: Metrics.ratio(15),
  },
  address: {
    paddingTop: Metrics.ratio(15),
    marginTop: Metrics.ratio(19),
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  totalPrice: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
  },
  feeContainer: {
    marginBottom: Metrics.BOTTOM_SPACING + Metrics.ratio(20),
  },
  author: { marginTop: Metrics.ratio(15) },
});
