import { StyleSheet } from 'react-native';
import { Metrics } from '../../../theme';

export default StyleSheet.create({
  imagesContainer: {
    paddingHorizontal: Metrics.ratio(20),
    paddingTop: Metrics.ratio(14),
  },
  image: {
    width: Metrics.ratio(60),
    height: Metrics.ratio(60),
    borderRadius: Metrics.smallMargin,
    marginRight: Metrics.smallMargin,
  },
  placeholderStyle: {
    width: Metrics.ratio(60),
    height: Metrics.ratio(60),
  },
});
