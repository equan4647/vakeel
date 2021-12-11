import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingBottom: Metrics.ratio(40),
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successfulTitleTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_34,
    marginTop: Metrics.ratio(13),
  },
  successfulDescriptionTextStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_16,
    marginTop: Metrics.ratio(5),
    lineHeight: 20,
  },
  dateTime: {
    marginTop: Metrics.ratio(20),
    marginBottom: Metrics.ratio(55),
    fontSize: Fonts.size.size_16,
    textAlign: 'center',
  },
  deliveryDays: {
    fontSize: Fonts.size.size_16,
  },
});
