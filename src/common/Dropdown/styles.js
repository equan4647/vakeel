import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  input: {
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.ratio(18),
    flex: 1,
    borderRadius: Metrics.borderRadius12,
    paddingLeft: Metrics.ratio(15),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Metrics.borderRadius12,
    marginTop: Metrics.ratio(5),
    borderColor: Colors.lightBlueGrey,
  },
  title: { lineHeight: 16, marginTop: Metrics.baseMargin },
  errorText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.size_12,
    color: 'red',
    marginLeft: Metrics.ratio(6),
  },
});
