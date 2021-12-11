import { Platform, StatusBar, View, FlatList } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import React, { useRef } from 'react';

import { Images, AppStyles, Metrics, Colors } from '../../theme';
import { Text, ButtonView, Image } from '../../components';
import { TextInput, SearchInput } from '..';

import { cityData } from '../../data';
import styles from './styles';

const Item = React.memo(({ data, selected, onPress }) => (
  <ButtonView style={styles.itemContainer} onPress={() => onPress(data)}>
    <Text lineHeight={Metrics.ratio(16)} size="size_17">
      {data?.title ?? ''}
    </Text>
    {selected ? <Image source={Images.icons.selected} /> : null}
  </ButtonView>
));

const SelectionInput = props => {
  const refRBSheet = useRef();
  return (
    <>
      <TextInput
        {...props}
        onPress={onChange => {
          refRBSheet.current.open();
          //onChange('this is testing');
          //alert('show dialog');
        }}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={Platform.select({ ios: 400, android: 800 })}
        closeDuration={300}
        animationType="none"
        customStyles={{
          container: styles.container,
          wrapper: styles.wrapper,
          draggableIcon: AppStyles.handleModal,
        }}
      >
        <StatusBar backgroundColor={Colors.blackO8} />
        <View style={styles.headerContainer}>
          <Text type="semiBold" size="size_22">
            Select Country Code
          </Text>
          <SearchInput style={styles.search} />
        </View>

        <FlatList
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          style={styles.flatlist}
          data={cityData}
          renderItem={({ item }) => {
            return <Item selected={false} data={item} onPress={data => {}} />;
          }}
        />
      </RBSheet>
    </>
  );
};
export default SelectionInput;

/*
            const selected = _data.id === value?.id;
            return <Item {...{ selected, _data }} onPress={onSelect} />;
            */
/*
height={Metrics.scaleVertical(399)}
*/
