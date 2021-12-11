import { StyleSheet } from 'react-native';

import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.ratio(5),
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.black,
    paddingHorizontal: Metrics.ratio(14),
    paddingVertical: Metrics.ratio(4),
  },
  text: { maxWidth: Metrics.ratio(50), fontSize: Fonts.size.size_12 },
});
