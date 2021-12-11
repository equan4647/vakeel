import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftTitleTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    flex: 1,
  },
  rightTitleTextStyle: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_13,
    marginLeft: Metrics.smallMargin,
  },
  separator: {
    marginBottom: Metrics.largeMargin,
  },
});
