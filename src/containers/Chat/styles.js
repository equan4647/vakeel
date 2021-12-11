import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    paddingBottom: Metrics.BOTTOM_SPACING,
  },
  calendarIcon: { marginRight: Metrics.mediumMargin },
  contentContainerStyle: { paddingBottom: Metrics.mediumMargin },
  topLoader: { paddingBottom: Metrics.mediumMargin },
  loadMoreButtonStyle: {
    marginTop: 0,
    marginBottom: Metrics.ratio(20),
    alignSelf: 'center',
    paddingVertical: 0,
    height: Metrics.ratio(30),
    paddingHorizontal: Metrics.ratio(8),
  },
});
