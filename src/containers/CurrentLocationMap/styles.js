import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Metrics.screenHeight - Metrics.navBarHeight - Metrics.ratio(90),
    width: Metrics.screenWidth,
  },
  map: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    height: Metrics.screenHeight - Metrics.navBarHeight - Metrics.ratio(90),
    width: Metrics.screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    bottom: Metrics.ratio(90) + Metrics.BOTTOM_SPACING,
  },
  searchInput: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 20,
    height: 50,
    borderColor: Colors.lightBlueGrey,
    zIndex: 1,
  },

  suggestionContainer: {
    position: 'absolute',
    top: Metrics.ratio(42),
    marginHorizontal: Metrics.mediumMargin,
    paddingTop: Metrics.ratio(30),
    backgroundColor: Colors.white,
    width: Metrics.screenWidth - Metrics.ratio(40),
    zIndex: 0,
    borderBottomRightRadius: Metrics.ratio(26),
    borderBottomLeftRadius: Metrics.ratio(26),
    paddingBottom: Metrics.mediumMargin,
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  suggesttionItem: {
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.mediumMargin,
    paddingVertical: Metrics.bigSmallMargin,
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  circle: {
    backgroundColor: Colors.lightBlue,
    width: Metrics.ratio(20),
    height: Metrics.ratio(20),
    borderRadius: Metrics.ratio(10),
    position: 'absolute',
    zIndex: 1,
  },
});
