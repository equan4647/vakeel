import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  container: {
    marginTop: Metrics.mediumMargin,
  },

  editBtnContainer: {
    flex: 1,
    marginBottom: Metrics.ratio(10),
    overflow: 'hidden',
    marginTop: Metrics.mediumMargin,
  },
  imageContainer: {
    width: Metrics.ratio(80),
    height: Metrics.ratio(80),
    borderRadius: Metrics.ratio(40),
    backgroundColor: Colors.whiteFour,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  imageStyle: {
    width: Metrics.ratio(80),
    height: Metrics.ratio(80),
    borderRadius: Metrics.ratio(100),
    overflow: 'hidden',
  },
  ediBtnTextContainer: {
    backgroundColor: Colors.frogGreen,
    opacity: 0.9,
    height: Metrics.ratio(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: { marginRight: Metrics.ratio(18) },
});
