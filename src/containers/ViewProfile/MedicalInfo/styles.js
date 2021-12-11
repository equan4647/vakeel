import { StyleSheet } from 'react-native';
import { Metrics, Fonts, Colors } from '../../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: Metrics.ratio(24),
    paddingBottom: Metrics.ratio(17),
    marginHorizontal: Metrics.ratio(20),
    borderBottomColor: Colors.lightBlueGrey,
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    marginBottom: Metrics.ratio(11),
  },
  editBtn: {
    fontFamily: Fonts.type.semiBold,
    color: Colors.black,
  },
  fieldTitle: {
    marginBottom: 2,
    marginTop: Metrics.ratio(23),
  },
  fieldValue: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.semiBold,
  },
  fieldContainer: {
    marginVertical: Metrics.ratio(11),
  },
  degree: {
    marginTop: Metrics.ratio(3),
    fontSize: Fonts.size.size_14,
  },
  year: {
    marginTop: Metrics.ratio(2),
    fontSize: Fonts.size.size_12,
  },
});
