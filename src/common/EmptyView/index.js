import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../../components';
import { Images, Metrics } from '../../theme';
import styles from './styles';

const images = {
  location: Images.icons.location,
  photo: Images.images.emptyPhoto,
  card: Images.images.emptyCard,
  ads: Images.images.advertiseEmpty,
  messages: Images.emptyImages.messages,
  calendar: Images.emptyImages.calendarEmpty,
  servicePending: Images.emptyImages.serviceEmptyPending,
  deliveries: Images.emptyImages.deliveriesEmpty,
  orderCompleted: Images.emptyImages.orderCompletedEmpty,
  rating: Images.emptyImages.ratingEmpty,
  notifications: Images.emptyImages.notificationEmpty,
  cart: Images.emptyImages.myCartEmpty,
  classified: Images.emptyImages.classifiedEmpty,
  buying: Images.emptyImages.buyingEmpty,
  food: Images.emptyImages.foodEmpty,
  foodOrder: Images.emptyImages.emptyFoodOrder,
};

const EmptyView = props => {
  const {
    image,
    text,
    arrowTowards,
    indented,
    containerStyle,
    withoutImage,
    withoutArrow,
    imageStyle,
  } = props;
  const arrowSpecificStyles = {
    [arrowTowards]: 20,
    transform: [{ rotateY: arrowTowards === 'left' ? '180deg' : '0deg' }],
  };
  const containerSpecificStyles = {
    marginHorizontal: indented ? Metrics.ratio(30) : Metrics.ratio(10),
  };
  const textSpecificStyles = {
    marginTop: image === 'location' ? Metrics.ratio(15) : Metrics.ratio(20),
  };
  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        containerSpecificStyles,
        containerStyle,
      ])}
    >
      {!withoutArrow && (
        <Image
          source={Images.images.directionArrow}
          style={StyleSheet.flatten([styles.arrow, arrowSpecificStyles])}
        />
      )}
      {withoutImage ? (
        <View style={styles.image} />
      ) : (
        <Image source={images[image]} style={[styles.image, imageStyle]} />
      )}
      <Text style={StyleSheet.flatten([styles.text, textSpecificStyles])}>
        {text}
      </Text>
    </View>
  );
};

EmptyView.propTypes = {
  arrowTowards: PropTypes.oneOf(['right', 'left']),
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  indented: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  withoutImage: PropTypes.bool,
};
EmptyView.defaultProps = {
  arrowTowards: 'right',
  image: 'location',
  indented: false,
  withoutImage: false,
  withoutArrow: false,
};

export default React.memo(EmptyView);
