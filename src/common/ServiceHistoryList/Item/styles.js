import { StyleSheet } from 'react-native';

import { Metrics, Colors } from '../../../theme';

export default StyleSheet.create({
  main: {
    paddingBottom: Metrics.ratio(20),
    paddingTop: Metrics.ratio(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBlueGrey,
  },
  nameContainer: {
    marginTop: Metrics.ratio(14),
  },
});
