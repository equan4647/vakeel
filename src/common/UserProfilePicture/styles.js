import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  image: {
    width: Metrics.ratio(80),
    height: Metrics.ratio(80),
    borderRadius: Metrics.ratio(40),
    borderWidth: 0,
  },
  editButtonStyle: {
    position: 'absolute',
    bottom: 0,
  },
  editTextStyle: {
    position: 'absolute',
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_13,
    lineHeight: Metrics.ratio(16),
    textAlign: 'center',
    color: Colors.white,
    marginTop: Metrics.ratio(1),
  },
});
