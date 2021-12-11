import { StyleSheet } from 'react-native';
import { Metrics, AppStyles, Fonts, Colors } from '../../theme';

export default StyleSheet.create({
  contentContainer: { paddingBottom: Metrics.ratio(40) },
  image: {
    width: Metrics.scale(335),
    height: Metrics.ratio(222),
    borderRadius: Metrics.ratio(25),
    marginTop: Metrics.ratio(15),
    marginBottom: Metrics.ratio(15),
    backgroundColor: 'red',
  },
  seperator: {
    height: 1,
    backgroundColor: Colors.lightBlueGrey,
    marginTop: Metrics.ratio(14.5),
    marginBottom: Metrics.ratio(14.5),
  },
  addId: {
    fontSize: Fonts.size.size_16,
    // marginBottom: Metrics.ratio(17.5),
  },
  productName: {
    fontFamily: Fonts.type.semiBold,
    fontSize: Fonts.size.size_20,
    marginBottom: Metrics.ratio(2),
  },
  time: {
    marginTop: Metrics.ratio(2),
    marginBottom: Metrics.ratio(18),
  },
  description: {
    fontSize: Fonts.size.size_16,
    lineHeight: Metrics.ratio(22),
  },
  address: {
    marginLeft: Metrics.ratio(10),
    paddingRight: 150,
  },
  totalDays: {
    fontSize: Fonts.size.size_16,
    marginBottom: Metrics.ratio(7),
    marginTop: Metrics.ratio(12),
  },
  daysDurationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationText: {
    marginTop: Metrics.ratio(6),
  },
  engagmentPickerText: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.regular,
  },
  engamentDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.ratio(18.5),
  },
  engamentDetail: {
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: Metrics.ratio(20),
    paddingTop: Metrics.ratio(15),
    paddingBottom: Metrics.ratio(18.4),
    borderRadius: Metrics.ratio(25),
    borderColor: Colors.lightBlueGrey,
  },
  seperato2: {
    marginLeft: 10,
  },
  engamentDetailTitle: {
    marginBottom: Metrics.ratio(5),
  },
  botomButtonContainer: {
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
  },
  engagementTitle: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    flex: 1,
  },
  engagmentContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  displayAddress: {
    marginTop: Metrics.ratio(15.5),
    borderTopWidth: Metrics.ratio(1),
    borderTopColor: Colors.lightBlueGrey,
    paddingTop: Metrics.ratio(17.5),
  },
  rightTextStyle: {
    fontFamily: Fonts.type.bold,
  },
  locationIconStyle: {
    width: Metrics.ratio(12),
    height: Metrics.ratio(15),
    tintColor: Colors.black,
    marginRight: Metrics.ratio(10),
    // marginTop: Platform.select({
    //   android: Metrics.ratio(3),
    //   ios: Metrics.ratio(2),
    // }),
  },
  addressSubText: {
    paddingRight: 10,
  },
});
