import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Metrics.ratio(15),
    // marginTop: Metrics.ratio(19),
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
});
