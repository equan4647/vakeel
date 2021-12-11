import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  container: {},
  textDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImageStyle: {
    marginRight: Metrics.ratio(7),
  },
  separatorStyle: {},
  listStyle: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.ratio(30),
  },
  adsContainerStyle: { paddingHorizontal: Metrics.mediumMargin },
  content: {
    marginHorizontal: Metrics.mediumMargin,
  },
  listContainerStyle: { paddingHorizontal: Metrics.mediumMargin },
  ratingContainer: {
    marginVertical: Metrics.baseMargin,
  },
});
