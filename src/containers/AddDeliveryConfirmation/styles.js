import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  topBar: {
    marginTop: Metrics.smallMargin,
  },
  pkgDetail: { marginBottom: Metrics.ratio(15) },
  bar: {
    borderTopWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
    paddingTop: Metrics.ratio(15),
    marginTop: 0,
  },
  barStyle: { marginTop: Metrics.ratio(15) },
});
