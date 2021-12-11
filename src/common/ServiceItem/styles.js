import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  img: {
    borderRadius: Metrics.ratio(25),
    height: Metrics.scale(151),
    width: Metrics.scale(150),
  },
  imgContainer: {
    borderRadius: Metrics.ratio(25),
    height: Metrics.scale(151),
    width: Metrics.scale(150),
    justifyContent: 'space-between',
    backgroundColor: '#DADADA',
    marginBottom: Metrics.ratio(10),
    padding: Metrics.smallMargin,
  },
  price: {
    marginTop: Metrics.ratio(4),
    marginBottom: Metrics.ratio(7),
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_14,
  },
  favorite: { alignSelf: 'flex-end' },
  container: { width: Metrics.scale(150) },
});
