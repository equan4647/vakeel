import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../theme';

export default StyleSheet.create({
  container: {},
  textDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImageStyle: {
    marginRight: Metrics.ratio(7),
  },
  separatorStyle: {
    marginVertical: Metrics.ratio(26),
    marginHorizontal: Metrics.mediumMargin,
  },
  listStyle: {
    flex: 1,
    marginTop: Metrics.baseMargin,
    // marginBottom: Metrics.ratio(30),
  },
  adsContainerStyle: { paddingHorizontal: Metrics.mediumMargin },
  content: {
    marginHorizontal: Metrics.mediumMargin,
    marginBottom: 0,
    borderBottomWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
  },
  listContainerStyle: { paddingHorizontal: Metrics.mediumMargin },
  headerStyle: { marginTop: -4 },
});
