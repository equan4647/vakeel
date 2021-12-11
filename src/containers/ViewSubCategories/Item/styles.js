import { StyleSheet } from 'react-native';

import { Metrics } from '../../../theme';

export default StyleSheet.create({
  itemContainer: {
    paddingVertical: Metrics.ratio(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
