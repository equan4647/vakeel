import { FlatList, View, ViewPropTypes } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { HorizontalTitle, EmptyViewCarousel } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import Item from './Item';

import { classifiedSelectors } from '../../ducks/classified';

const AdsCarousel = ({
  headerTitle,
  rightTitle,
  rightPress,
  style,
  contentContainerStyle,
  identifier,
  leftTextStyleTitle,
  containerStyleTitle,
}) => {
  const classifiedList = useSelector(
    classifiedSelectors.getClassifiedList(identifier)
  );

  const rightProps =
    classifiedList.length === 0
      ? {}
      : { rightTitle: rightTitle, onPress: rightPress };

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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          contentContainerStyle,
        ]}
        style={[style]}
        data={classifiedList}
        keyExtractor={(item, index) => `${item}_${index}`}
        renderItem={({ item }) => <Item {...{ item }} />}
        horizontal={true}
        directionalLockEnabled={true}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <EmptyViewCarousel />}
      />
    </>
  );
};

AdsCarousel.propTypes = {
  contentContainerStyle: ViewPropTypes.style,
  identifier: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  headerTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  rightPress: PropTypes.func,
  isDetail: PropTypes.bool,
  leftTextStyleTitle: ViewPropTypes.style,
  containerStyleTitle: ViewPropTypes.style,
};
AdsCarousel.defaultProps = {
  headerTitle: '',
  rightTitle: strings('app.see_all'),
  rightPress: undefined,
  isDetail: false,
  leftTextStyleTitle: {},
  containerStyleTitle: {},
};

export default React.memo(AdsCarousel, (prevProps, nextProps) => {
  return prevProps.identifier === nextProps.identifier;
});
