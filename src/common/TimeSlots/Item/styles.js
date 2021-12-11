import { StyleSheet } from 'react-native';

import { Colors, Metrics } from '../../../theme';

export default StyleSheet.create({
  line: {
    width: Metrics.ratio(2),
    height: Metrics.ratio(42),
    borderStyle: 'solid',
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.veryLightPinkTwo,
    marginLeft: Metrics.ratio(4.5),
  },
  container: {
    flexDirection: 'row',
    paddingVertical: Metrics.ratio(6),
    alignItems: 'center',
  },
  circle: {
    width: Metrics.ratio(12),
    height: Metrics.ratio(12),
    borderRadius: Metrics.ratio(6),
  },
  title: { flex: 1, marginHorizontal: Metrics.ratio(20), marginBottom: 0 },
});
