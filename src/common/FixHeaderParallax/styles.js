import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  transparentHeader: {
    height: Metrics.navBarHeight,
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Metrics.statusBarHeight,
    top: 0,
    paddingHorizontal: Metrics.mediumMargin,
  },
});
