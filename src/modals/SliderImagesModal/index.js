import React, { useImperativeHandle, useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';

import { LoaderView } from '../../components';

const SliderImagesModal = (props, forwardedRef) => {
  //set default state
  const [isVisibale, setIsVisible] = useState(false);

  // hide modal function
  const hideMoadl = () => {
    setIsVisible(false);
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: () => {
      setIsVisible(true);
    },
    hide: () => {
      hideMoadl();
    },
  }));

  if (isVisibale) {
    const images = [
      { url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
    ];
    return (
      <Modal visible={true} transparent={true}>
        <ImageViewer imageUrls={images} />
      </Modal>
    );
  }
  return null;
};
export default React.forwardRef(SliderImagesModal);
