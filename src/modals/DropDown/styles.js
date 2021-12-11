import { StyleSheet, Platform } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  flatlist: {
    backgroundColor: Colors.white,
    marginBottom: Metrics.BOTTOM_SPACING - Metrics.ratio(13),
    paddingHorizontal: Metrics.mediumMargin,
  },
  modal: {
    borderTopRightRadius: Metrics.ratio(15),
    borderTopLeftRadius: Metrics.ratio(15),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Metrics.ratio(13),
  },
  headerContainer: {
    paddingTop: Metrics.ratio(23),
    paddingHorizontal: Metrics.mediumMargin,
    marginBottom: Metrics.smallMargin,
    borderTopRightRadius: Metrics.ratio(15),
    borderTopLeftRadius: Metrics.ratio(15),
  },
  searchHeaderStyle: { minHeight: Metrics.ratio(114) },
  headerText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_22,
    //marginBottom: Metrics.baseMargin,
    textAlign: 'center',
  },
  search: { marginTop: Metrics.baseMargin },
  cross: {
    paddingTop: Metrics.smallMargin,
    paddingRight: Metrics.baseMargin,
    position: 'absolute',
  },
  modalStyle: {
    flex: Platform.select({
      android: 0.9,
      ios: 1,
    }),
  },
  handle: {
    width: Metrics.ratio(29),
    height: Metrics.ratio(4),
    borderRadius: Metrics.ratio(2),
    backgroundColor: Colors.pinkishGrey,
  },
  searchInput: { marginTop: Metrics.baseMargin },
});
