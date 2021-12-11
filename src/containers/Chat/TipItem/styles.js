import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../theme';

export default StyleSheet.create({
  container: {
    paddingVertical: Metrics.smallMargin,
    paddingHorizontal: Metrics.ratio(10),
    borderRadius: Metrics.ratio(18),
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    marginBottom: Metrics.ratio(18),
  },
  text: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_15,
    letterSpacing: -0.24,
    color: Colors.white,
  },
});
