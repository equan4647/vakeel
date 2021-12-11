import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../theme';
export default StyleSheet.create({
  headerLeftContainerStyle: {},
  headerTitleStyle: {},
  tabContainer: {
    backgroundColor: Colors.white,
    shadowColor: Colors.blackO1,
    paddingHorizontal: 2,
    paddingTop: 7,
    shadowRadius: 4,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
  },
  tabStyle: { height: 42 },
  tabbarLabel: {
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.size_10,
  },
  sceneContainerTab: { backgroundColor: Colors.white },
  sceneContainerDrawer: { backgroundColor: 'transparent' },
  drawerStyles: { flex: 1, width: '58%', backgroundColor: Colors.transparent },
  drawerContainer: { flex: 1, backgroundColor: Colors.black },
  drawerShadow: {
    flex: 1,
    borderRadius: Metrics.ratio(24),
    transform: [{ scaleY: 0.78 }],
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    backgroundColor: Colors.dimBlack,
    position: 'absolute',
  },
  stack: {
    flex: 1,
    overflow: 'hidden',
  },
  //   drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white' },
  advertisementBack: {
    paddingLeft: Platform.select({ android: Metrics.ratio(10) }),
  },
  triangleLeft: {
    left: -72,
    transform: [{ rotate: '90deg' }, { scaleY: 8 / 80 }],
  },
  triangleRight: {
    right: -72,
    transform: [{ rotate: '270deg' }, { scaleY: 8 / 80 }],
  },
  trianglePositionVertical: {
    position: 'absolute',
    top: Metrics.scaleVertical(388),
  },
});
