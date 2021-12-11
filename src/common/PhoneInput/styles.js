import { Platform, StyleSheet } from 'react-native';
import { Colors, Metrics, AppStyles, Fonts } from '../../theme';

export default StyleSheet.create({
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 0.8,
    borderColor: Colors.lightBlueGrey,
    paddingLeft: Metrics.ratio(15),
    paddingVertical: Metrics.ratio(6),
  },
  arrowImage: { marginHorizontal: Metrics.ratio(14) },
});
