import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  text: {
    marginTop: Metrics.ratio(36),
    marginBottom: Metrics.ratio(18),
    fontSize: Fonts.size.size_22,
    fontFamily: Fonts.type.semiBold,
  },
});
