import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  input: { marginTop: Metrics.ratio(40) },
  privacyLink: {
    marginTop:
      Metrics.screenHeight >= 812
        ? Metrics.scaleVertical(160)
        : Metrics.scaleVertical(78),
  },
});
