import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  textRegular: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.regular,
    marginRight: Metrics.smallMargin,
  },
  textBold: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(14),
  },
});
