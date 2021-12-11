import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  bottomTextLeft: {
    flex: 1,
    fontSize: Fonts.size.size_14,
    maxWidth: '70%',
  },
  title: {
    marginBottom: Metrics.baseMargin,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_22,
  },
  stepIndicator: { marginBottom: Metrics.baseMargin },
});
