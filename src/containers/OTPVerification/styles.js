import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.ratio(20),
    paddingTop: Metrics.navBarHeight,
  },
  descriptionTextStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(20),
    marginTop: Metrics.ratio(5),
  },
  otpInputContainer: {
    width: '100%',
    height: Metrics.ratio(78),
    marginTop: Metrics.ratio(47),
  },
  underlineStyleBase: {
    width: Metrics.ratio(78),
    height: Metrics.ratio(78),
    borderWidth: 1,
    borderRadius: Metrics.borderRadius12,
    fontSize: Fonts.size.size_18,
    fontFamily: Fonts.type.semiBold,
    borderColor: Colors.lightBlueGrey,
    color: Colors.black,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Metrics.ratio(13),
    marginBottom: Metrics.ratio(15),
  },
  timerBoldTextStyle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_13,
    color: Colors.black,
    flex: 1,
  },
  resendTextStyle: {
    fontFamily: Fonts.type.bold,
    color: Colors.primary,
  },
  appButton: {
    marginTop: 0,
  },
  timeText: { width: Metrics.ratio(30) },
});
