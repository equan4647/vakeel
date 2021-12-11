import { StyleSheet } from 'react-native';

import { Metrics, Colors } from '../../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.pumpkinOrange,
    padding: Metrics.smallMargin,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  message: { lineHeight: Metrics.ratio(20) },
});
