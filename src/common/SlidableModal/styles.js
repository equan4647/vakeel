import { Platform, StyleSheet } from 'react-native';

import { Colors, Metrics } from '../../theme';
export default StyleSheet.create({
  flatlist: {
    // flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: Metrics.BOTTOM_SPACING - Metrics.ratio(14),
    // paddingHorizontal: Metrics.mediumMargin,
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
    paddingHorizontal: Metrics.mediumMargin,
  },
  headerContainer: {
    // paddingTop: Metrics.ratio(23),
    paddingHorizontal: Metrics.mediumMargin,
    marginBottom: Metrics.smallMargin,
    borderTopRightRadius: Metrics.ratio(15),
    borderTopLeftRadius: Metrics.ratio(15),
  },
  search: { marginTop: Metrics.baseMargin },
  container: {
    borderTopRightRadius: Metrics.ratio(15),
    borderTopLeftRadius: Metrics.ratio(15),
    backgroundColor: Colors.white,
  },
  wrapper: {
    backgroundColor: Colors.blackO8,
    paddingTop: Platform.select({ ios: Metrics.scaleVertical(245) }),
  },
});
