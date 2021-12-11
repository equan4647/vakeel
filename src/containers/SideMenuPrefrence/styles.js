import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts, AppStyles } from '../../theme';

export default StyleSheet.create({
  container: {
    ...AppStyles.container,
    backgroundColor: Colors.black,
    justifyContent: 'space-between',
    paddingBottom: Metrics.BOTTOM_SPACING,
    paddingTop: Metrics.navBarHeight + 4,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_34,
  },
  description: {
    color: Colors.white,
    fontSize: Fonts.size.size_16,
  },
  selectionContainer: {
    flex: 1,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: Metrics.ratio(26),
    marginTop: 50,
    marginBottom: 50,
    width: Metrics.scale(209),
    // height: Metrics.scaleVertical(452),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  directionTextRight: {
    marginLeft: Metrics.ratio(13),
    fontFamily: Fonts.type.medium,
  },
  directionTextLeft: {
    marginRight: Metrics.ratio(13),
    fontFamily: Fonts.type.medium,
  },
  directionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.ratio(-1),
    marginRight: Metrics.ratio(-1),
  },
  // leftImage: { tintColor: Colors.white },
});
