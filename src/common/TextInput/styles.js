import { StyleSheet, Platform } from 'react-native';

import { Fonts, Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  input: {
    paddingTop: Metrics.ratio(17),
    paddingBottom: Platform.OS === 'ios' ? Metrics.ratio(18) : Metrics.ratio(8),
    flex: 1,
    borderRadius: Metrics.borderRadius12,
    paddingHorizontal: Metrics.ratio(15),
    fontSize: Fonts.size.size_13,
    textAlignVertical: 'top',
    color: Colors.black,
    fontFamily: Fonts.type.semiBold,
    // fontWeight: 'normal',
  },
  multline: {
    height: Metrics.multilineHeight,
    paddingBottom: Metrics.smallMargin,
    paddingTop: Platform.select({ ios: Metrics.smallMargin }),
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: Metrics.borderRadius,
    marginTop: Metrics.ratio(5),
    alignItems: 'center',
  },
  title: { lineHeight: Metrics.ratio(16), marginTop: Metrics.baseMargin },
  errorText: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.size_12,
    color: Colors.errorInput,
    marginTop: Metrics.ratio(2),
  },
  hint: {
    marginTop: Metrics.ratio(6),
  },
  arrowStyle: { marginRight: Metrics.ratio(15) },
  bottomSpace: { marginBottom: Metrics.ratio(10) },
  topSpace: { marginTop: Metrics.ratio(6) },
});
