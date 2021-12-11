import { StyleSheet } from 'react-native';

import { Metrics, Fonts } from '../../../theme';

export default StyleSheet.create({
  gridContainer: {
    alignItems: 'center',
    width: Metrics.screenWidth / Metrics.ratio(2) - Metrics.ratio(20),
    marginBottom: Metrics.screenHeight / 12,
  },
  textGrid: { fontSize: Fonts.size.size_16, marginTop: Metrics.ratio(10) },
});
