import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  input: {
    paddingVertical: Metrics.ratio(17),
    backgroundColor: Colors.white,
    flex: 1,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.lightBlueGrey,
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_13,
    textAlign: 'center',
  },
  headingContainer: {
    marginBottom: Metrics.ratio(17),
  },
  textInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.ratio(11),
  },
  separatorTextStyle: {
    fontSize: Fonts.size.size_15,
    marginHorizontal: Metrics.ratio(6),
  },
});
