import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  title: {
    marginTop: Metrics.scaleVertical(112),
    fontSize: Fonts.size.size_22,
    fontFamily: Fonts.type.semiBold,
    color: Colors.primary,
    textAlign: 'center',
  },
  text: {
    fontSize: Fonts.size.size_16,
    minHeight: Metrics.ratio(56),
    marginVertical: Metrics.bigSmallMargin,
    color: Colors.white,
    textAlign: 'center',
    maxWidth: '75%',
  },
  contentContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  buttonConrainer: {
    marginBottom: Metrics.BOTTOM_SPACING,
    marginHorizontal: Metrics.mediumMargin,
    height: Metrics.ratio(70),
    width: Metrics.screenWidth - Metrics.ratio(40),
  },
});
