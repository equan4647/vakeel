import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  modalStyle: {
    // borderTopRightRadius: Metrics.ratio(15),
    // borderTopLeftRadius: Metrics.ratio(15),
    paddingHorizontal: Metrics.ratio(20),
  },
  handle: {
    width: Metrics.ratio(29),
    height: Metrics.ratio(4),
    borderRadius: Metrics.ratio(2),
    backgroundColor: Colors.pinkishGrey,
  },
  title: {
    marginTop: Metrics.ratio(20),
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_22,
    textAlign: 'center',
  },
  buyerName: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.bold,
    marginTop: Metrics.ratio(5),
  },
  time: {
    fontSize: Fonts.size.size_16,
    marginTop: Metrics.ratio(5),
  },
  detailsContainer: { flex: 1 },
  userContainer: { alignItems: 'center', marginTop: Metrics.mediumMargin },
  description: {
    fontSize: Fonts.size.size_16,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: Fonts.type.bold,
    maxWidth: '60%',
    marginTop: Metrics.mediumMargin,
    lineHeight: 22,
  },
  rating: {
    alignSelf: 'center',
    paddingTop: Metrics.ratio(14),
    marginBottom: Metrics.smallMargin,
  },
  customStyleMulti: {
    paddingHorizontal: Metrics.ratio(20),
  },
  button: { marginBottom: Metrics.BOTTOM_SPACING },
});
