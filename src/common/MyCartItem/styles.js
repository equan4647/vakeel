import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

export default StyleSheet.create({
  itemContainer: {
    // padding: Metrics.ratio(12),
    borderRadius: Metrics.ratio(24),
    borderWidth: Metrics.ratio(1),
    borderColor: Colors.lightBlueGrey,
    flexDirection: 'row',
    marginBottom: Metrics.ratio(23),
  },
  imageContainer: {
    width: Metrics.ratio(90),
    height: Metrics.ratio(96),
    borderRadius: Metrics.ratio(18),
    margin: Metrics.ratio(12),
    padding: Metrics.ratio(5),
  },
  image: {
    width: Metrics.ratio(90),
    height: Metrics.ratio(96),
    borderRadius: Metrics.ratio(18),
    // margin: Metrics.ratio(12),
  },
  itemName: {
    marginBottom: Metrics.smallMargin,
    marginTop: Metrics.ratio(5),
  },
  countButton: {
    backgroundColor: Colors.CountButton,
    height: Metrics.ratio(26),
    width: Metrics.ratio(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: Metrics.ratio(17),
    marginRight: Metrics.ratio(14),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.ratio(15),
    marginRight: Metrics.ratio(15),
  },
  titleText: { marginRight: Metrics.ratio(12), marginLeft: Metrics.ratio(4) },
  countContainer: {
    width: Metrics.ratio(55),
    justifyContent: 'center',
    alignItems: 'center',
  },
  listHeading: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.size_16,
    marginBottom: Metrics.ratio(18),
    marginTop: Metrics.smallMargin,
  },
  colorCircle: {
    height: Metrics.ratio(14),
    width: Metrics.ratio(14),
    borderRadius: Metrics.ratio(7),
    marginLeft: Metrics.ratio(4),
    borderColor: Colors.paleGrey,
    borderWidth: Metrics.ratio(1),
    backgroundColor: Colors.white,
  },
});
