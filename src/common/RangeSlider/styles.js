import { StyleSheet } from 'react-native';

import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  selectedTrackStyle: {
    backgroundColor: Colors.primary,
  },
  unselectedTrackStyle: {
    backgroundColor: Colors.white2,
  },
  trackStyle: {
    height: Metrics.ratio(2),
    borderRadius: Metrics.ratio(4),
  },
  sliderContainer: { alignSelf: 'center' },
});
