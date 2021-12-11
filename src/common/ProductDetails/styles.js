import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  productDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(19),
    //marginBottom: Metrics.ratio(10),
  },
  productTitleText: {
    lineHeight: Metrics.ratio(22),
    fontSize: Fonts.size.size_16,
  },
  productValueText: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(22),
  },
  emptyText: { marginTop: Metrics.ratio(12), marginBottom: Metrics.ratio(6) },
});
