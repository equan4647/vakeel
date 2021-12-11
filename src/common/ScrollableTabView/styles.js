import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    //height: Metrics.ratio(52),
    backgroundColor: Colors.white,
  },
  tabTextStyle: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.size_15,
    //color: Colors.black,
    //fontWeight: 'normal',
  },
  selectedUnderline: {
    width: Metrics.ratio(19),
    height: Metrics.ratio(1),
    backgroundColor: Colors.primary,
  },
  scrollableTabBar: { borderColor: Colors.lightBlueGrey },
  tabBarUnderlineStyle: {
    backgroundColor: 'transparent',
    height: Metrics.ratio(1),
    alignItems: 'center',
  },
});
