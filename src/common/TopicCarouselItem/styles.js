import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  img: {
    borderRadius: Metrics.ratio(25),
    height: Metrics.ratio(161),
    width: Metrics.ratio(248),
  },
  imgContainer: {
    borderRadius: Metrics.ratio(25),
    height: Metrics.ratio(161),
    width: Metrics.ratio(248),
    justifyContent: 'space-between',
    backgroundColor: '#DADADA',
    marginBottom: Metrics.ratio(10),
    padding: Metrics.smallMargin,
  },

  favorite: { alignSelf: 'flex-end' },
  desc: {
    fontSize: Fonts.size.size_16,
    marginVertical: Metrics.ratio(4),
    width: Metrics.ratio(248),
  },
  title: {
    fontSize: Fonts.size.size_14,
    fontFamily: Fonts.type.bold,
    width: Metrics.ratio(248),
  },
});
