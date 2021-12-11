import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  wallet: {
    marginTop: Metrics.ratio(10),
    marginBottom: Metrics.ratio(25),
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 10,
  },
  selectCard: { marginBottom: Metrics.smallMargin },
});
