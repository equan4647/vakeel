import { Platform, StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingBottom: Metrics.BOTTOM_SPACING,
    //paddingTop: Metrics.smallMargin,
  },
  roundBox: {
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.black,
    borderRadius: Metrics.ratio(30),
    marginHorizontal: Metrics.ratio(20),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sendIcon: {
    paddingRight: Metrics.baseMargin,
    paddingLeft: Metrics.ratio(10),
    paddingBottom: Metrics.baseMargin,
  },
  attachmentIcon: {
    paddingHorizontal: Metrics.ratio(10),
    paddingBottom: Metrics.baseMargin,
  },
  textInput: {
    // backgroundColor: 'red',
    paddingLeft: Metrics.ratio(18),
    paddingRight: Metrics.ratio(4),

    flex: 1,
    fontSize: Fonts.size.size_14,
    maxHeight: Metrics.ratio(100),
    minHeight: Platform.select({
      android: Metrics.ratio(48),
      ios: Metrics.ratio(28),
    }),
    marginVertical: Platform.select({
      ios: Metrics.bigSmallMargin,
      android: Metrics.ratio(4),
    }),
    fontFamily: Fonts.type.regular,
  },
  loader: { padding: Metrics.baseMargin },
});
