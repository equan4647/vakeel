import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  bottom: {
    marginBottom: Metrics.ratio(29),
  },
  headingContainer: {
    marginHorizontal: Metrics.mediumMargin,
    marginTop: Metrics.largeMargin,
    marginBottom: Metrics.bigSmallMargin,
  },
  listContainer: { paddingHorizontal: Metrics.mediumMargin },
  searchInput: {
    marginTop: Metrics.ratio(7),
    marginHorizontal: Metrics.mediumMargin,
  },
  categoriesList: { marginTop: Metrics.baseMargin },
  adsList: { marginTop: Metrics.bigSmallMargin },
  orderProgressContainer: {
    borderTopRightRadius: Metrics.ratio(15),
    borderTopLeftRadius: Metrics.ratio(15),
    backgroundColor: Colors.white,
    position: 'absolute',
    width: Metrics.screenWidth,
    padding: Metrics.mediumMargin,
    paddingTop: Metrics.largeMargin,
    zIndex: 1,
    bottom: 0,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 11,
    shadowOpacity: 1,
    elevation: 9,
  },
  actionButton: {
    // marginBottom: Metrics.ratio(175),
  },
  arrow: {
    transform: [{ rotate: '-90deg' }],
    position: 'absolute',
    top: 25,
    right: 21,
  },
});
