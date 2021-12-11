import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: Metrics.ratio(20),
    paddingBottom: Metrics.ratio(20),
    borderRadius: Metrics.ratio(20),
    borderWidth: 1,
    borderColor: Colors.lightBlueGrey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBar: {
    width: 1,
    height: '80%',
    backgroundColor: 'blue',
    marginLeft: -1,
  },
  title: {},
  time: { marginTop: Metrics.ratio(3) },
  details: { paddingHorizontal: Metrics.ratio(20) },
});
