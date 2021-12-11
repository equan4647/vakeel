import { StyleSheet } from 'react-native';

import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  details: {
    lineHeight: Metrics.ratio(24),
    marginTop: Metrics.smallMargin,
    fontSize: Fonts.size.size_16,
  },
  height: { maxHeight: Metrics.screenHeight * 0.175 },
});
