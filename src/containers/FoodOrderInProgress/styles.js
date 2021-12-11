import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  contentContainerStyle: {
    marginTop: Metrics.ratio(14),
    paddingBottom: Metrics.BOTTOM_SPACING + Metrics.mediumMargin,
  },
  horizontalTitle: { marginBottom: Metrics.ratio(17) },
  barStyle: {
    // marginTop: Metrics.ratio(15),
    marginBottom: Metrics.ratio(15),
  },

  textRegular: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.regular,
  },
  textBold: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(14),
  },
  listSeparator: {
    marginTop: Metrics.mediumMargin,
    marginBottom: Metrics.ratio(2),
  },
  listTotal: {
    marginTop: Metrics.baseMargin,
  },
  stepper: {
    paddingBottom: Metrics.baseMargin,
    marginBottom: Metrics.ratio(15),
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  bringerInfo: {
    paddingTop: Metrics.mediumMargin,
    borderTopWidth: Metrics.ratio(1),
    marginTop: Metrics.ratio(18),
    borderColor: Colors.lightBlueGrey,
  },
  addressItem: { paddingVertical: Metrics.ratio(5) },
  displayAddress: {
    borderTopWidth: Metrics.ratio(1),
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
    paddingVertical: Metrics.ratio(15),
    marginVertical: Metrics.ratio(15),
  },
});
