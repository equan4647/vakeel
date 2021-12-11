import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  appButtonContainer: {
    marginHorizontal: Metrics.ratio(20),
    marginBottom: Metrics.ratio(20),
  },
  mainContainer: {
    paddingHorizontal: Metrics.ratio(20),
  },
  container: {
    // width: Metrics.scale(335),
    // height: Metrics.scale(222),
    borderRadius: Metrics.ratio(25),
    // padding: Metrics.smallMargin,
    alignItems: 'flex-end',
    marginHorizontal: Metrics.ratio(20),
    // flex: 1,
    marginTop: Metrics.ratio(28),
  },
  image: {
    width: Metrics.scale(335),
    height: Metrics.scale(222),
    borderRadius: Metrics.ratio(25),
  },
  crossbtn: { alignSelf: 'flex-end' },
  // emptyView: { marginTop: Metrics.scaleVertical(7) },
});
