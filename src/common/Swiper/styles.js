import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../theme';

export default StyleSheet.create({
  itemContainer: {
    width: '100%',
    // height: Metrics.imagesSwiperHeight,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  paginationContainer: {
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: Metrics.screenWidth,
    height: Metrics.imagesSwiperHeight,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: Metrics.ratio(44),
    borderBottomRightRadius: Metrics.ratio(44),
  },
});
