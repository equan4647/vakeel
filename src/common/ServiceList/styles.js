import { StyleSheet } from 'react-native';
import { Metrics, AppStyles } from '../../theme';

export default StyleSheet.create({
  list: AppStyles.flex,
  separator: { width: '100%', height: Metrics.ratio(30) },
});
