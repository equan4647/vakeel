import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  imageStyle: {
    width: Metrics.ratio(60),
    height: Metrics.ratio(60),
    borderRadius: Metrics.ratio(12),
    // backgroundColor: Colors.whiteFour,
  },

  imgPlaceholderStyle: { width: Metrics.ratio(60), height: Metrics.ratio(60) },
  detailContainer: { marginLeft: Metrics.ratio(10) },

  priceTextStyle: {
    fontFamily: Fonts.type.bold,
    marginVertical: Metrics.ratio(4),
  },
  spreadRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
