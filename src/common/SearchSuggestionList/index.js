import { FlatList } from 'react-native';
import React from 'react';

import { HorizontalTitle, Separator, PopularListItem } from '../../common';
import { Text, ErrorViewApi } from '../../components';
import styles from './styles';

export default React.memo(
  ({
    style,
    separator,
    type,
    title,
    data,
    headerProps,
    onPress,
    contentContainerStyle,
    titleKey = 'title',
    emptyViewText = '',
    itemStyle = {},
    errorMessage = '',
    retryClick = undefined,
    ...rest
  }) => {
    const renderItem = ({ item }) => (
      <PopularListItem
        data={item}
        {...{ type, onPress, titleKey, itemStyle }}
      />
    );

    const renderHeader = () => (
      <>
        {separator ? <Separator style={styles.separatorStyle} /> : null}

        {title ? <HorizontalTitle title={title} {...headerProps} /> : null}

        {emptyViewText ? (
          <Text style={styles.emptyViewText} type="medium" size="size_15">
            {emptyViewText}
          </Text>
        ) : null}

        {errorMessage ? (
          <ErrorViewApi
            errorMessage={errorMessage}
            onPressRetry={retryClick}
            containerStyle={styles.errorView}
          />
        ) : null}
      </>
    );

    return (
      <FlatList
        {...{ data, style, renderItem, contentContainerStyle }}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        keyboardShouldPersistTaps="always"
        {...rest}
      />
    );
  }
);
