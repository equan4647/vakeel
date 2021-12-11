import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';
export default StyleSheet.create({
  listContainer: { paddingBottom: Metrics.ratio(70) + Metrics.BOTTOM_SPACING },
  // subTotal: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginTop: Metrics.ratio(2),
  // },
  delivery: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(14),
    marginBottom: Metrics.ratio(45),
    // + Metrics.BOTTOM_SPACING,
  },
  list: {
    paddingTop: Metrics.ratio(13),
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.mediumMargin,
  },
  spreadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Metrics.ratio(3),
    marginBottom: Metrics.ratio(28),
  },
  bringerImg: {
    marginRight: Metrics.ratio(10),
  },
  bringer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.lightBlueGrey,
    paddingTop: Metrics.ratio(29),
    marginTop: Metrics.ratio(27),
  },
  deliveryAvailablity: {
    marginTop: Metrics.bigSmallMargin,
  },
  subTotal: {
    marginTop: Metrics.ratio(2),
  },
  emptyContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.scaleVertical(100),
  },
});
