import { Platform, StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  img: {
    borderRadius: Metrics.ratio(25),
    height: Metrics.scale(161),
    // width: Metrics.scale(248),
  },
  imgContainer: {
    // borderRadius: Metrics.ratio(25),
    // height: Metrics.scale(161),
    // // width: Metrics.scale(248),
    // justifyContent: 'space-between',
    // backgroundColor: '#DADADA',
    marginBottom: Metrics.ratio(10),
    // padding: Metrics.smallMargin,
  },
  price: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_14,
  },
  favorite: { alignSelf: 'flex-end' },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(4),
    marginBottom: Metrics.ratio(7),
    alignSelf: 'center',
    // width: '100%',
  },
  tagItemContainer: {
    // height: Metrics.ratio(4),
    // width: Metrics.ratio(4),
    // borderRadius: Metrics.ratio(2),
    // backgroundColor: Colors.black,
    marginHorizontal: Metrics.ratio(4),
  },
  estimatedTime: {
    backgroundColor: Colors.white,
    padding: Metrics.smallMargin,
    paddingBottom: Platform.select({ android: Metrics.ratio(9) }),
    borderRadius: Metrics.ratio(15),
    alignSelf: 'flex-start',
  },
});
