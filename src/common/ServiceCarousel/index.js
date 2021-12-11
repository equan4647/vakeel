import React from 'react';
import { FlatList, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { EmptyViewCarousel, HorizontalTitle, ServiceItem } from '..';
import styles from './styles';
import { useSelector } from 'react-redux';
import { AppStyles } from '../../theme';
import { servicesSelectors } from '../../ducks/services';

const ServiceCarousel = props => {
  const {
    style,
    contentContainerStyle,
    identifier,
    rightTitle,
    rightPress,
    leftTextStyleTitle,
    containerStyleTitle,
    headerTitle,
  } = props;

  const servicesList = useSelector(
    servicesSelectors.getServicesList(identifier)
  );

  const rightProps =
    servicesList.length === 0
      ? {}
      : { rightTitle: rightTitle, onPress: rightPress };

  // const rightProps = { rightTitle: rightTitle, onPress: rightPress };

  return (
    <>
      {headerTitle ? (
        <HorizontalTitle
          title={headerTitle}
          leftTextStyle={[AppStyles.subHeadLeftText, leftTextStyleTitle]}
          containerStyle={[styles.headingContainer, containerStyleTitle]}
          {...rightProps}
        />
      ) : null}
      <FlatList
        data={servicesList}
        showsHorizontalScrollIndicator={false}
        {...{ style, contentContainerStyle }}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => <ServiceItem item={item} />}
        horizontal
        directionalLockEnabled
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <EmptyViewCarousel />}
        extraData={servicesList}
      />
    </>
  );
};

ServiceCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  onItemPress: PropTypes.func,
};
ServiceCarousel.defaultProps = {
  data: [],
};

export default ServiceCarousel;
