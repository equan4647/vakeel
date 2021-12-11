import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    shadowColor: Colors.blackO1,
    shadowOffset: {
      width: 0,
      height: -0.5,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 9,
    paddingBottom: Metrics.BOTTOM_SPACING,
    paddingHorizontal: Metrics.mediumMargin,
  },
});
