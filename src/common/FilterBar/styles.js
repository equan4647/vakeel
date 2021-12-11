import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    // backgroundColor: '',
    paddingHorizontal: Metrics.mediumMargin,
    paddingVertical: Metrics.smallMargin,
    //height: Metrics.ratio(52),
    paddingTop: Metrics.mediumMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    // marginBottom: Metrics.mediumMargin,
    // flex: 1,
  },
  filterIcon: {
    marginRight: Metrics.bigSmallMargin,
    marginLeft: Metrics.mediumMargin,
  },
  badge: { position: 'absolute', top: -8, right: -10 },
});
