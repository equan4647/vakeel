import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  logo: {
    marginTop: Metrics.screenHeight / 30,
    marginBottom: Metrics.screenHeight / 24,
  },
  forgotLink: {
    fontFamily: Fonts.type.bold,
    color: Colors.primary,
    paddingRight: Metrics.ratio(14),
    //paddingVertical: Metrics.baseMargin,
  },
  or: {
    marginVertical: Metrics.baseMargin,
    textAlign: 'center',
  },
  headerRight: {
    marginTop: Metrics.statusBarHeight + Metrics.baseMargin,
    alignSelf: 'flex-end',
    marginRight: 0,
  },
  statusBarView: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: Metrics.statusBarHeight,
    backgroundColor: Colors.white,
  },
});
