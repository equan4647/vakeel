import React from 'react';
import { FlatList, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { AppStyles } from '../../theme';
import { TopicsListItem } from '..';
import styles from './styles';

const TopicsList = props => {
  const { style, contentContainerStyle, data, itemProps } = props;
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      style={[AppStyles.container, style]}
      contentContainerStyle={[AppStyles.listContainer, contentContainerStyle]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <TopicsListItem {...item} {...itemProps} />}
      directionalLockEnabled
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      {...props}
    />
  );
};

TopicsList.propTypes = {
  data: PropTypes.array.isRequired,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  itemProps: PropTypes.object,
};
TopicsList.defaultProps = {
  data: [],
};

export default TopicsList;
