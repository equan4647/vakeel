import { StyleSheet } from 'react-native';

import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {
    marginRight: Metrics.baseMargin * 2,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.ratio(4),
  },
  colorContainer: {
    width: Metrics.ratio(22),
    height: Metrics.ratio(22),
    borderRadius: Metrics.ratio(11),
  },
  arrow: { marginLeft: Metrics.ratio(6), marginTop: Metrics.ratio(3) },
  colorItem: { flexDirection: 'row', alignItems: 'center' },
});
