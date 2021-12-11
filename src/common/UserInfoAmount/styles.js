import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: Metrics.smallMargin,
    alignItems: 'center',
  },
  userContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  userName: { marginLeft: Metrics.ratio(10), fontSize: Fonts.size.size_16 },
  serviceName: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.semiBold,
  },
  userImage: { width: Metrics.ratio(30), height: Metrics.ratio(30) },
  price: { marginTop: Metrics.ratio(2), fontFamily: Fonts.type.bold },
});
