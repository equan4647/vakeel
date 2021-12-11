import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  priceContainer: {
    marginTop: Metrics.ratio(4),
    marginBottom: Metrics.ratio(7),
    flexDirection: 'row',
  },
  price: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_14,
  },
  discoutedPrice: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_10,
    marginLeft: Metrics.ratio(5),
    marginTop: Metrics.ratio(4),
    textDecorationLine: 'line-through',
  },
  favorite: { alignSelf: 'flex-end' },
  title: { marginTop: Metrics.ratio(10) },
});
