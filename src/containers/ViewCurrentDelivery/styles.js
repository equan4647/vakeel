import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  container: { paddingBottom: Metrics.BOTTOM_SPACING },
  deliveryInfoContainer: {
    paddingHorizontal: Metrics.ratio(20),
    backgroundColor: Colors.white,
  },
  bringerContainer: {
    marginTop: 0,
    paddingTop: Metrics.ratio(14),
    borderTopWidth: 0,
  },
  distance: { paddingTop: Metrics.baseMargin, fontFamily: Fonts.type.semiBold },
  vehicleItem: {
    flex: 0,
    marginTop: Metrics.ratio(14),
    marginBottom: Metrics.smallMargin,
  },
  cancelButton: {
    alignSelf: 'center',
    paddingHorizontal: Metrics.ratio(20),
    paddingVertical: Metrics.smallMargin,
  },
});
