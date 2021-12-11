import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  initialLayout: { width: Metrics.screenWidth },
  tabbarStyle: {
    height: Metrics.ratio(52),
    justifyContent: 'center',
    borderColor: Colors.lightBlueGrey,
    borderBottomWidth: Metrics.ratio(1),
    backgroundColor: Colors.white,
  },
  tabbarIndicator: {
    backgroundColor: Colors.primary,
    height: Metrics.ratio(1),
    width: Metrics.screenWidth / 3 - Metrics.ratio(40),
    marginHorizontal: Metrics.mediumMargin,
  },
});
