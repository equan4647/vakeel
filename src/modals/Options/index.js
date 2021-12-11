import React, { useImperativeHandle, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';

import { AppStyles, Metrics } from '../../theme';
import { Header, Item } from './Components';
import styles from './styles';

const Options = (props, forwardedRef) => {
  const [data, setData] = useState({});
  const _modalRef = useRef();
  const _itemRef = useRef();

  const renderHeader = () => <Header title={data.title} />;

  const renderItem = ({ item: _data }) => {
    const { onSelect } = props;
    const selected = _data.code === '092';
    return <Item {...{ selected, _data }} onPress={onSelect} />;
  };
  useImperativeHandle(forwardedRef, () => ({
    show: _data => {
      setData(_data);
      setImmediate(() => {
        _modalRef.current.open();
      });
    },
    hide: _modalRef.current.close,
  }));
  return (
    <Modalize
      ref={_modalRef}
      contentRef={_itemRef}
      useNativeDriver={true}
      handleStyle={AppStyles.handleModal}
      handlePosition="inside"
      modalStyle={styles.modal}
      disableScrollIfPossible={false}
      snapPoint={Metrics.scaleVertical(200)}
      closeSnapPointStraightEnabled={false}
      threshold={30}
      HeaderComponent={renderHeader}
      adjustToContentHeight={true}
      modalTopOffset={Metrics.screenHeight / 10}
      flatListProps={{
        data: data.items,
        keyExtractor: (_, index) => index.toString(),
        showsVerticalScrollIndicator: false,
        style: styles.flatlist,
        renderItem,
      }}
    />
  );
};
export default React.forwardRef(Options);
