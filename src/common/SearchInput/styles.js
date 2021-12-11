import { StyleSheet, Platform } from 'react-native';
import { Metrics, Colors, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.ratio(26),
    borderColor: Colors.black,
    borderBottomWidth: 1.1,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Metrics.ratio(17),
    paddingRight: Metrics.ratio(13),
    backgroundColor: Colors.white,
    flex: 1,
    maxHeight: Platform.select({
      android: Metrics.ratio(48),
      ios: Metrics.ratio(48),
    }),
  },
  input: {
    marginVertical: Platform.select({
      ios: Metrics.ratio(3),
      android: Metrics.ratio(1),
    }),
    height: Platform.select({
      ios: Metrics.ratio(31),
    }),
    paddingLeft: Metrics.bigSmallMargin,
    marginRight: Metrics.ratio(13),
    backgroundColor: Colors.white,
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.type.regular,
    fontWeight: 'normal',
  },
  image: { tintColor: Colors.black },
  headerWrapper: {
    backgroundColor: Colors.white,
    width: Metrics.screenWidth,
    paddingHorizontal: Metrics.mediumMargin,
    paddingTop: Metrics.statusBarHeight + 5,
    height: Metrics.navBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: { marginRight: Metrics.baseMargin },
});
