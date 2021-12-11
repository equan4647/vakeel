import { Platform, StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../theme';

export default StyleSheet.create({
  container: {
    // marginBottom: Metrics.BOTTOM_SPACING + Metrics.ratio(80),
    //marginHorizontal: Metrics.ratio(18),
  },
  tabContent: {
    marginBottom: Metrics.BOTTOM_SPACING + Metrics.ratio(85),
  },
  title: { paddingTop: Metrics.ratio(25), marginHorizontal: Metrics.ratio(18) },
  itemContainer: {
    flexDirection: 'row',
    paddingTop: Metrics.ratio(20),
    paddingBottom: Metrics.ratio(24),
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
    alignItems: 'center',
    marginHorizontal: Metrics.ratio(18),
  },
  description: {
    marginBottom: Metrics.ratio(14),
    marginTop: Metrics.ratio(4),
    marginRight: Metrics.ratio(12),
  },
  itemImage: {
    width: Metrics.ratio(60),
    height: Metrics.ratio(60),
    borderRadius: Metrics.ratio(8),
  },
  countCircle: {
    position: 'absolute',
    right: Metrics.ratio(-4),
    width: Metrics.ratio(22),
    height: Metrics.ratio(22),
    borderRadius: Metrics.ratio(11),
    top: Metrics.ratio(-4),
    backgroundColor: Colors.frogGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.white,
    paddingBottom: Platform.select({ android: Metrics.ratio(1) }),
  },
  separator: {
    height: Metrics.ratio(1),
    backgroundColor: Colors.lightBlueGrey,
  },
});
