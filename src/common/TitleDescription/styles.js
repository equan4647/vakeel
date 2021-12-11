import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  titleTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    marginBottom: Metrics.ratio(11),
  },
  subTextStyle: {
    fontSize: Fonts.size.size_13,
  },
  subTextContainer: {
    flexDirection: 'row',
  },
  separator: {
    marginBottom: Metrics.ratio(15.5),
    marginTop: Metrics.ratio(17.5),
  },
  subImage: {
    marginTop: Metrics.ratio(1),
  },
  subContainer: {
    flexDirection: 'row',
  },
});
