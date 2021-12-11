import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  estimatedTime: {
    position: 'absolute',
    left: Metrics.ratio(20),
    bottom: Metrics.ratio(20),
  },
  resturantInfo: {
    marginHorizontal: Metrics.ratio(18),
    paddingTop: Metrics.ratio(18),
    paddingBottom: Metrics.ratio(24),
    marginBottom: Metrics.ratio(20),
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  scrollTabViewDummyItem: { width: 0, height: 0 },
  scrollableTabView: { height: Metrics.ratio(34), backgroundColor: 'white' },
  tabBarContainerStyle: {
    height: Metrics.ratio(34),
    marginBottom: Metrics.ratio(10),
  },
  tabStyle: { bottom: Metrics.ratio(18) },
  scrollView: { paddingTop: Metrics.navBarHeight },
  contentContainerStyle: {
    paddingBottom: Metrics.navBarHeight + Metrics.BOTTOM_SPACING,
  },
  emptyHeaderView: {
    height: Metrics.imagesSwiperHeight - Metrics.navBarHeight,
  },
  actionButton: {
    marginBottom: Metrics.BOTTOM_SPACING + Metrics.mediumMargin,
  },
  footer: {
    height: Metrics.BOTTOM_SPACING + Metrics.ratio(80),
    backgroundColor: Colors.white,
  },
  main: {
    paddingHorizontal: 0,
  },
});
