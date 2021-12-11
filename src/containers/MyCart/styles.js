import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';
export default StyleSheet.create({
  listContainer: { paddingBottom: Metrics.ratio(70) + Metrics.BOTTOM_SPACING },
  subTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(2),
  },
  delivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(14),
    marginBottom: Metrics.ratio(45),
    // + Metrics.BOTTOM_SPACING,
  },
  list: {
    paddingTop: Metrics.baseMargin,
    // paddingBottom: Metrics.ratio(70) + Metrics.BOTTOM_SPACING,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.mediumMargin,
  },
  selectAllText: {
    fontSize: Fonts.size.size_15,
    fontFamily: Fonts.type.medium,
  },
  selectAllImg: {
    height: Metrics.ratio(22),
    width: Metrics.ratio(22),
    marginHorizontal: Metrics.smallMargin,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  checkoutButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: Metrics.baseMargin,
    marginTop: 0,
    flex: 1,
    marginLeft: Metrics.baseMargin,
    maxWidth: Metrics.screenWidth * 0.5,
  },

  emptyContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.scaleVertical(100),
  },
});
