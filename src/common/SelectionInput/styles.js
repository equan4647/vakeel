import { StyleSheet, Platform } from 'react-native';
import { Fonts, Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  favorite: { alignSelf: 'flex-end', margin: Metrics.smallMargin },
  search: { marginTop: Metrics.baseMargin },
  container: {
    borderTopRightRadius: Metrics.ratio(15),
    borderTopLeftRadius: Metrics.ratio(15),
    backgroundColor: Colors.white,
  },
  wrapper: {
    backgroundColor: Colors.blackO8,
    //paddingTop: Platform.select({ ios: Metrics.scaleVertical(245) }),
  },
  flatlist: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: Metrics.BOTTOM_SPACING - Metrics.ratio(14),
    // paddingHorizontal: Metrics.mediumMargin,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Metrics.ratio(13),
    paddingHorizontal: Metrics.mediumMargin,
  },
});
