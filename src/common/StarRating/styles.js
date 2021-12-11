import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  titleTextStyle: {
    marginBottom: Metrics.ratio(4),
  },
  starStyle: { marginLeft: 0, marginRight: 0 },
  starContainer: {
    paddingHorizontal: Metrics.ratio(2),
  },
  countText: { marginLeft: Metrics.ratio(8), marginBottom: 4 },
  upto: {
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.type.semiBold,
    marginLeft: Metrics.ratio(5),
  },
});
