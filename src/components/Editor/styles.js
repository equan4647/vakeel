import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';
export default StyleSheet.create({
  fontsListItem: {
    paddingVertical: Metrics.ratio(5),
    paddingHorizontal: Metrics.ratio(30),
  },
  fontItemText: {
    fontSize: Fonts.size.size_17,
  },
  toolbar: {
    justifyContent: 'flex-start',
    height: Metrics.ratio(Metrics.isIphoneX() ? 72 : 62),
    backgroundColor: Platform.select({
      ios: Colors.whiteO9,
      android: Colors.white,
    }),
    borderWidth: 0,
    elevation: 9,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowRadius: 7,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
  },
  fontOptionsContainer: {
    paddingBottom: Platform.select({
      ios: Metrics.mediumMargin,
      android: Metrics.mediumMargin + Metrics.ratio(62),
    }),
  },
  optionsContainer: {
    maxHeight: Metrics.scaleVertical(250),
  },
});
