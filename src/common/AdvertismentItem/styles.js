import { StyleSheet, Platform } from 'react-native';
import { Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  title: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_20,
  },
  addType: {
    fontSize: Fonts.size.size_13,
    marginBottom: Metrics.ratio(12),
    marginTop: Metrics.ratio(2),
  },
  image: {
    width: Metrics.scale(335),
    height: Metrics.ratio(222),
    borderRadius: Platform.OS === 'ios' ? Metrics.ratio(25) : Metrics.ratio(15),
  },
  description: {
    marginTop: Metrics.ratio(5),
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(24),
  },
  buttonsContainer: {
    marginTop: Metrics.ratio(9),
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 6,
  },
  btnText: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_14,
  },
  seperator: {
    width: 10,
  },
});
