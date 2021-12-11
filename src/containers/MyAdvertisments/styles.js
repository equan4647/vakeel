import { StyleSheet } from 'react-native';
import { Fonts, Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: Metrics.mediumMargin,
    marginTop: 16,
  },
  separatorStyle: {
    marginVertical: Metrics.ratio(13),
  },
  contentContainerStyle: {
    paddingTop: Metrics.ratio(10),
    paddingBottom: Metrics.ratio(20),
  },
});
