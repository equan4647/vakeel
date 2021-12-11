import React, { useImperativeHandle, useState } from 'react';
import { Image, Modal, ActivityIndicator, StatusBar } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { ButtonView, Text } from '../../components';
import { Images, Metrics } from '../../theme';
import { Util } from '../../utils';
import styles from './styles';

const ImageViewerModal = (props, forwardedRef) => {
  const [visible, setVisisble] = useState(false);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [callback, setCallback] = useState({});

  useImperativeHandle(forwardedRef, () => ({
    show: (images2, index, setIndex) => {
      setImages(Util.formatImageViewerData(images2));
      index && setCurrentIndex?.(index);
      setIndex && setCallback?.({ setIndex });
      setVisisble(true);
    },
    hide: () => {
      hideModal();
    },
  }));

  const hideModal = () => {
    callback && callback?.setIndex?.(currentIndex);
    setCurrentIndex?.(0);
    setImages?.([]);
    setVisisble?.(false);
  };

  const renderHeader = () => (
    <ButtonView onPress={hideModal} style={styles.headerContainer}>
      <Image source={Images.icons.crossGray} />
    </ButtonView>
  );

  const renderLoader = () => <ActivityIndicator color="#fff" />;

  const renderIndicator = (index, total) =>
    images.length > 1 ? (
      <Text style={styles.indicator}>{index + '/' + total}</Text>
    ) : null;

  return (
    <Modal visible={visible} onRequestClose={hideModal}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ImageViewer
        loadingRender={renderLoader}
        renderHeader={renderHeader}
        enableSwipeDown={true}
        style={{ backgroundColor: '#000' }}
        onCancel={hideModal}
        imageUrls={images}
        index={currentIndex}
        saveToLocalByLongPress={false}
        backgroundColor="#000"
        onChange={setCurrentIndex}
        renderIndicator={renderIndicator}
      />
    </Modal>
  );
};
export default React.forwardRef(ImageViewerModal);
