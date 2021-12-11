import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';
export default StyleSheet.create({
  header: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_22,
    marginLeft: Metrics.mediumMargin,
    marginTop: Metrics.largeMargin,
    maxWidth: '70%',
  },
  children: {
    marginBottom: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.mediumMargin,
  },
});
