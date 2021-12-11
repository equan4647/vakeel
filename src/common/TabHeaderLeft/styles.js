import { Platform, StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';
import { Util } from '../../utils';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Platform.select({ android: Metrics.ratio(10) }),
    maxWidth: Util.isGuest()
      ? Metrics.screenWidth
      : Metrics.screenWidth - Metrics.ratio(130),
  },
  text: {
    paddingHorizontal: Metrics.ratio(7),
    fontSize: Fonts.size.size_16,
  },
  badge: {
    position: 'absolute',
    top: -7,
    right: -15,
  },
  arrowDown: { marginTop: Metrics.ratio(2) },
});
