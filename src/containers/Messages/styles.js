import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  seperator: {
    height: Metrics.ratio(30),
  },
  contentContainerStyle: {
    paddingBottom: Metrics.BOTTOM_SPACING,
    //marginTop: Metrics.ratio(20),
  },
});
