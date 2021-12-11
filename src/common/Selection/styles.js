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
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.regular,
  },
  separator: {
    marginBottom: Metrics.largeMargin,
  },
  rightArrow: { marginLeft: 10, marginTop: 2 },
});
