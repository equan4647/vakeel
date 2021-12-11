import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: Metrics.baseMargin,
    borderColor: Colors.lightBlueGrey,
    borderTopWidth: Metrics.ratio(1),
    paddingTop: Metrics.ratio(20),
  },
});
