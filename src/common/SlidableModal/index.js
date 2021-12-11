import React from 'react';
import { FlatList, Image, StatusBar, Platform, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import { SearchInput } from '..';
import { Text, ButtonView } from '../../components';
import { AppStyles, Colors, Images, Metrics } from '../../theme';
import styles from './styles';

export const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text type="semiBold" size="size_22">
      {title}
    </Text>
    <SearchInput style={styles.search} />
  </View>
);

const Item = React.memo(({ _data, selected, onPress }) => (
  <ButtonView style={styles.itemContainer} onPress={() => onPress(_data)}>
    <Text lineHeight={Metrics.ratio(16)} size="size_17">
      {_data?.name}
    </Text>
    {selected ? <Image source={Images.icons.selected} /> : null}
  </ButtonView>
));

export default React.forwardRef(function (props, forwardedRef) {
  const { data, value, onSelect, title } = props;
  return (
    <RBSheet
      ref={forwardedRef}
      closeOnDragDown={true}
      closeOnPressMask={true}
      openDuration={Platform.select({ ios: 400, android: 800 })}
      closeDuration={300}
      animationType="none"
      height={Metrics.scaleVertical(399)}
      customStyles={{
        container: styles.container,
        wrapper: styles.wrapper,
        draggableIcon: AppStyles.handleModal,
      }}
    >
      <StatusBar backgroundColor={Colors.blackO8} />
      <Header {...{ title }} onSearch={() => null} />
      <FlatList
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        style={styles.flatlist}
        data={data}
        extraData={data}
        renderItem={({ item: _data }) => {
          const selected = _data.id === value?.id;
          return <Item {...{ selected, _data }} onPress={onSelect} />;
        }}
      />
    </RBSheet>
  );
});
