import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { EmptyView, PhotoGridItem } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';

export const PhotosGrid = ({ data, onPress, type }) => {
  const renderItem = ({ item, index }) => (
    <PhotoGridItem data={item} {...{ onPress, type, index }} />
  );
  const renderEmptyView = () => (
    <EmptyView
      image="photo"
      containerStyle={styles.emptyView}
      indented
      text={strings('app.add_photo_empty_text')}
    />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      columnWrapperStyle={styles.columnWrapper}
      ListEmptyComponent={renderEmptyView}
      style={AppStyles.flex}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={renderItem}
      numColumns={2}
      extraData={data}
      showsVerticalScrollIndicator={false}
    />
  );
};

PhotosGrid.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.any.isRequired,
  onPress: PropTypes.func,
};
PhotosGrid.defaultProps = {
  onPress: () => {},
};

export default React.memo(PhotosGrid, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});
