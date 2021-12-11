import { StyleSheet } from 'react-native';

import { Metrics } from '../../theme';

export default StyleSheet.create({
  separator: {
    height: Metrics.ratio(3),
  },
  itemContainer: {
    paddingHorizontal: Metrics.mediumMargin,
    paddingVertical: Metrics.ratio(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainerStyle: {
    marginTop: Metrics.baseMargin,
  },
  switchItem: {
    paddingHorizontal: Metrics.mediumMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Metrics.ratio(4),
  },
});
