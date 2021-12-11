import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  contentContainerStyle: {
    marginTop: Metrics.ratio(14),
    paddingBottom: Metrics.BOTTOM_SPACING + Metrics.mediumMargin,
  },
  horizontalTitle: { marginBottom: Metrics.ratio(17) },
  barStyleTopBottom: {
    marginTop: Metrics.ratio(15),
    marginBottom: Metrics.ratio(15),
  },
  barStyleBottom: {
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
  listTotal: { marginTop: Metrics.baseMargin },
  stepper: {
    paddingBottom: Metrics.baseMargin,
    marginBottom: Metrics.ratio(15),
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  bringerInfo: {
    paddingTop: Metrics.mediumMargin,
    paddingBottom: Metrics.ratio(15),
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  addressItem: { paddingVertical: Metrics.ratio(5) },
  callOption: {
    paddingTop: Metrics.baseMargin,
    // marginBottom: Metrics.ratio(15),
    // borderBottomWidth: Metrics.ratio(1),
    // borderColor: Colors.lightBlueGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  id: {
    paddingTop: Metrics.ratio(15),
    marginTop: Metrics.ratio(15),
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
});
