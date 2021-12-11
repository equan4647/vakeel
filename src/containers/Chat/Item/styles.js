import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../../theme';

export default StyleSheet.create({
  date: {
    backgroundColor: Colors.white,
    textAlign: 'center',
    paddingBottom: Metrics.ratio(24),
  },
  messageContainer: {
    borderRadius: Metrics.ratio(20),
    paddingTop: Metrics.ratio(6),
    paddingBottom: Metrics.ratio(10),
    paddingLeft: Metrics.ratio(14),
    paddingRight: Metrics.baseMargin,
    maxWidth: '80%',
  },
  message: { letterSpacing: -0.24 },
  arrow: {
    position: 'absolute',
    bottom: Metrics.ratio(-1),
  },
  timeContainer: {
    marginBottom: Metrics.ratio(22),
    marginTop: Metrics.ratio(6),
  },
  time: { letterSpacing: 0.39 },
  image: { width: Metrics.ratio(280), height: Metrics.ratio(180) },
});
