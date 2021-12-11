import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  imageStyle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: Metrics.ratio(44),
    borderBottomRightRadius: Metrics.ratio(44),
  },
});
