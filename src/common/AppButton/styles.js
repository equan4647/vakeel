import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.borderRadius12,
    // paddingVertical: Metrics.borderRadius12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: Metrics.ratio(50),
    marginTop: Metrics.mediumMargin,
  },
  titleTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    textAlign: 'center',
  },
  logoStyle: {
    marginRight: Metrics.ratio(9),
  },
});
