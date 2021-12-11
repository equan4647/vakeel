import { StyleSheet } from 'react-native';
import { Metrics } from '../../theme';

export default StyleSheet.create({
  text: {
    marginTop: Metrics.ratio(36),
    marginBottom: Metrics.ratio(18),
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.ratio(6),
  },
  itemImageContainer: {
    width: Metrics.ratio(50),
    paddingHorizontal: 0,
    marginRight: Metrics.ratio(20),
  },
  itemImage: {
    width: Metrics.ratio(50),
    height: Metrics.ratio(30),
  },
  imgPlaceholderStyle: {
    height: Metrics.ratio(30),
    width: Metrics.ratio(30),
    // marginHorizontal: Metrics.ratio(17),
    // alignSelf: 'center',
  },
  smallImage: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(20),
    marginRight: Metrics.ratio(10),
  },
  smallImagePlaceHolder: {
    width: Metrics.ratio(30),
    height: Metrics.ratio(30),
  },
});
