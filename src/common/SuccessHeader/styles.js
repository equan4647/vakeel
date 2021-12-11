import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingBottom: Metrics.ratio(20),
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  successfulTitleTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_34,
    marginTop: Metrics.ratio(13),
  },
  successfulDescriptionTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_16,
    marginTop: Metrics.ratio(5),
    lineHeight: 20,
  },
});
