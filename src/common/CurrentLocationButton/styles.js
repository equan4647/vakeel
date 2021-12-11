import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.lightBlueGrey,
    borderBottomWidth: Metrics.ratio(1),
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.ratio(27),
  },
  content: {
    marginLeft: Metrics.ratio(10),
    justifyContent: 'center',
  },
  location: { marginTop: Metrics.ratio(2), marginRight: Metrics.mediumMargin },
});
