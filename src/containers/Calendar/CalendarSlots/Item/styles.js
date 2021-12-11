import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: Metrics.ratio(15),
    paddingTop: Metrics.ratio(15),
    paddingBottom: Metrics.ratio(24),
    backgroundColor: 'red',
    borderRadius: Metrics.ratio(20),
  },
  title: {
    fontSize: Fonts.size.size_20,
    color: Colors.white,
  },
  time: {
    fontSize: Fonts.size.size_17,
    color: Colors.white,
    marginTop: Metrics.ratio(5),
  },
});
