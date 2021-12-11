import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  containerStyle: { marginBottom: Metrics.ratio(0) },
  barStyle: {
    // marginTop: Metrics.ratio(15),
    marginBottom: Metrics.ratio(15),
  },

  textRegular: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.regular,
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
  listSeparator: {
    marginTop: Metrics.mediumMargin,
    marginBottom: Metrics.ratio(2),
  },
  listTotal: {
    marginTop: Metrics.baseMargin,
  },
  content: {
    marginTop: Metrics.baseMargin,
    paddingBottom: Metrics.ratio(30),
  },
});
