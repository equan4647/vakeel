import ImagePicker from 'react-native-image-crop-picker';
// import Permissions from 'react-native-permissions';
import { RESULTS, check, request, PERMISSIONS } from 'react-native-permissions';
import { Alert, Platform, Linking } from 'react-native';

import { PICKER_TYPE, IMAGE_COMPRESS_MAX_WIDTH } from '../config/Constants';
import { strings } from '../utils/i18n';
import { Util } from '.';

const IMAGE_PICKER_OPTIONS = {
  includeExif: false, // Include image details in the response
  includeBase64: false, // (default false) | image as a base64-encoded string in the data property
  mediaType: 'photo', // default 'any' | ('photo', 'video', or 'any')
  useFrontCamera: false, // (default false) 'front' or 'selfie' camera when opened

  /* multiple selection  */
  multiple: false,
  waitAnimationEnd: false, // (ios only) default true
  forceJpg: true, // (ios only) default false
  /* Should be use without cropping, just resizing after selection  */
  compressImageMaxWidth: IMAGE_COMPRESS_MAX_WIDTH,
  compressImageMaxHeight: IMAGE_COMPRESS_MAX_WIDTH,
  compressImageQuality: 0.5, // default 1 (Android) | 0.8 (iOS))

  /* Should be use when cropping */
  // Metrics.screenWidth
  width: IMAGE_COMPRESS_MAX_WIDTH, // only work with cropping
  height: IMAGE_COMPRESS_MAX_WIDTH, // only work with cropping
  cropping: false,
  cropperCircleOverlay: false, // Enable or disable circular cropping mask.
  enableRotationGesture: false, // (android only) default false
  freeStyleCropEnabled: true, // (android only) default false | Enable custom rectangle area for cropping
};

const CAMERA_PERMISSION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.CAMERA
    : PERMISSIONS.IOS.CAMERA;

const GALLERY_PERMISSION =
  Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    : PERMISSIONS.IOS.PHOTO_LIBRARY;

class MediaPicker {
  /**
   *
   * Show Picker
   *
   * @param {*} callback callback handle response
   * @param {*} pickerTypeCamera
   * @param {*} cameraOptions
   * @param {*} pickerTypeGallery
   * @param {*} galleryOptions
   */
  showImagePicker(
    callback,
    pickerTypeGallery = PICKER_TYPE.GALLERY,
    pickerTypeCamera = PICKER_TYPE.CAMERA,
    galleryOptions = {},
    cameraOptions = {}
  ) {
    this.checkPermission(() => {
      this.showPickerOptions(
        callback,
        pickerTypeCamera,
        cameraOptions,
        pickerTypeGallery,
        galleryOptions
      );
    });
  }

  showPickerOptionsAndroid(...args) {
    Alert.alert(
      strings('mediaPicker.title'),
      strings('mediaPicker.description'),
      [
        {
          text: strings('mediaPicker.camera'),
          onPress: () => this.pickImageFromCamera(...args),
        },
        {
          text: strings('mediaPicker.gallery'),
          onPress: () => this.pickGalleryOptions(...args),
        },
        {
          text: strings('mediaPicker.cancel'),
          onPress: () => {},
        },
      ]
    );
  }
  showPickerOptionsIOS(...args) {
    Util.showActionSheet(
      [
        strings('mediaPicker.camera'),
        strings('mediaPicker.gallery'),
        strings('mediaPicker.cancel'),
      ],
      index => {
        switch (index) {
          case 0:
            this.pickImageFromCamera(...args);
            break;
          case 1:
            [...args][3] === PICKER_TYPE.MULTI_PICK
              ? this.pickMultiple(...args)
              : this.pickImageFromGallery(...args);
            break;
          default:
            Util.DoNothing;
            break;
        }
      },
      -1,
      strings('mediaPicker.title'),
      strings('mediaPicker.description')
    );
  }

  showPickerOptions(...args) {
    console.log('options', ...args);
    Util.isPlatformIOS()
      ? this.showPickerOptionsIOS(...args)
      : this.showPickerOptionsAndroid(...args);
  }

  pickCameraOptions(...args) {
    let [
      callback,
      pickerTypeCamera,
      cameraOptions,
      pickerTypeGallery,
      galleryOptions,
    ] = args;
    //this.pickImageFromCameraWithCropping(callback, cameraOptions);

    switch (pickerTypeCamera) {
      case PICKER_TYPE.CAMERA:
      case PICKER_TYPE.CAMERA_BINARY_DATA:
        this.pickImageFromCamera(callback, cameraOptions);
        break;
      case PICKER_TYPE.CAMERA_WITH_CROPPING:
      case PICKER_TYPE.CAMERA_WITH_CROPPING_BINARY_DATA:
        this.pickImageFromCameraWithCropping(callback, cameraOptions);
        break;
    }
  }

  pickGalleryOptions(...args) {
    let [
      callback,
      pickerTypeCamera,
      cameraOptions,
      pickerTypeGallery,
      galleryOptions,
    ] = args;

    //console.log("pickerTypeGallery : ", pickerTypeGallery);
    // this.pickImageFromGalleryWithCropping(callback, galleryOptions);

    switch (pickerTypeGallery) {
      case PICKER_TYPE.GALLERY:
      case PICKER_TYPE.GALLERY_BINARY_DATA:
        this.pickImageFromGallery(callback, galleryOptions);
        break;
      case PICKER_TYPE.GALLERY_WITH_CROPPING:
      case PICKER_TYPE.GALLERY_WITH_CROPPING_BINARY_DATA:
        this.pickImageFromGalleryWithCropping(callback, galleryOptions);
        break;
      case PICKER_TYPE.MULTI_PICK:
      case PICKER_TYPE.MULTI_PICK_BINARY_DATA:
        this.pickMultiple(callback, galleryOptions);
        break;
    }
  }

  /**
   * Pick image from camera
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickImageFromCamera(callback, options = {}) {
    options = { ...IMAGE_PICKER_OPTIONS, ...options };

    // clean all images
    //this.cleanupImages();

    ImagePicker.openCamera({
      compressImageMaxWidth: options.compressImageMaxWidth,
      compressImageMaxHeight: options.compressImageMaxHeight,
      compressImageQuality: options.compressImageQuality,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
    })
      .then(image => {
        let path = this.getImageUriFromData(options.includeBase64, image);
        const imageData = { ...image, path };
        //console.log("image Data", imageData);
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Pick image from camera with cropping functionality
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickImageFromCameraWithCropping(callback, options = {}) {
    options = { ...IMAGE_PICKER_OPTIONS, ...options };

    // clean all images
    //this.cleanupImages();

    ImagePicker.openCamera({
      width: options.width,
      height: options.height,
      cropping: true,
      cropperCircleOverlay: options.cropperCircleOverlay,
      enableRotationGesture: options.enableRotationGesture,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
    })
      .then(image => {
        let path = this.getImageUriFromData(options.includeBase64, image);
        const imageData = { ...image, path };
        //console.log("image Data", imageData);
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Pick image from gallery
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickImageFromGallery(callback, options = {}) {
    options = { ...IMAGE_PICKER_OPTIONS, ...options };

    // clean all images
    //this.cleanupImages();

    ImagePicker.openPicker({
      compressImageMaxWidth: options.compressImageMaxWidth,
      compressImageMaxHeight: options.compressImageMaxHeight,
      compressImageQuality: options.compressImageQuality,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
    })
      .then(image => {
        let path = this.getImageUriFromData(options.includeBase64, image);
        const imageData = { ...image, path };
        //console.log("image Data", imageData);
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Pick image from gallery with cropping functionality
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickImageFromGalleryWithCropping(callback, options = {}) {
    options = { ...IMAGE_PICKER_OPTIONS, ...options };

    // clean all images
    //this.cleanupImages();

    ImagePicker.openPicker({
      // width: options.width,
      // height: options.height,
      width: options.width,
      height: options.height,
      cropping: true,
      cropperCircleOverlay: options.cropperCircleOverlay,
      enableRotationGesture: options.enableRotationGesture,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
    })
      .then(image => {
        let path = this.getImageUriFromData(options.includeBase64, image);
        const imageData = { ...image, path };
        //console.log("image Data", imageData);
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Pick multiple images
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *
   */
  pickMultiple(callback, options = {}) {
    options = { ...IMAGE_PICKER_OPTIONS, ...options };

    // clean all images
    //this.cleanupImages();

    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: options.waitAnimationEnd,
      forceJpg: options.forceJpg,
      compressImageMaxWidth: options.compressImageMaxWidth,
      compressImageMaxHeight: options.compressImageMaxHeight,
      compressImageQuality: options.compressImageQuality,
      mediaType: options.mediaType,
      includeExif: options.includeExif,
      includeBase64: options.includeBase64,
      maxFiles: options.maxFiles || 12,
    })
      .then(images => {
        let imageData = images.map(img => {
          //console.log("img.path", img.path);
          let uri =
            img.path || this.getImageUriFromData(options.includeBase64, img);
          return { ...img, uri };
        });
        //console.log("image Data", JSON.stringify(imageData));
        callback && callback(imageData);
      })
      .catch(e => this.handleError(e));
  }

  /**
   * Clean temp Images
   */
  cleanupImages() {
    ImagePicker.clean()
      .then(() => {
        //console.log("removed tmp images from tmp directory");
      })
      .catch(e => this.handleError(e));
  }

  /**
   *
   * Clean single temp image
   *
   * @param {*} image path to be clean
   */
  cleanupSingleImage(image) {
    //console.log("will cleanup image", image);

    ImagePicker.cleanSingle(image ? image.uri : null)
      .then(() => {
        //console.log(`removed tmp image ${image.uri} from tmp directory`);
      })
      .catch(e => this.handleError(e));
  }

  /**
   *
   * Get image path from response data
   *
   * @param {*} includeBase64
   * @param {*} image
   */
  getImageUriFromData(includeBase64, image) {
    //console.log("includeBase64", includeBase64);
    return includeBase64
      ? `data:${image.mime};base64,` + image.data
      : image.path;
  }

  handleError(error) {
    if (error.code && error.code === 'E_PICKER_CANCELLED') return;

    let errorMsg = error.message ? error.message : error;

    Alert.alert('Error', errorMsg);
  }

  openSettingModal() {
    Alert.alert(
      strings('permissions.permission_title_media'),
      strings('permissions.permission_description_media'),
      [
        { text: strings('mediaPicker.cancel'), style: 'cancel' },
        {
          text: strings('mediaPicker.open_settings'),
          onPress: () => Linking.openSettings(),
        },
      ],
      { cancelable: false }
    );
  }

  handlePermissions(triggerFunc) {
    request(CAMERA_PERMISSION)
      .then(cameraPermission => {
        return cameraPermission;
      })
      .then(cameraPermission => {
        request(GALLERY_PERMISSION).then(photoPermission => {
          if (
            cameraPermission === RESULTS.GRANTED &&
            photoPermission === RESULTS.GRANTED
          ) {
            triggerFunc();
          }
        });
      });
    // Permissions.request('camera')
    //   .then(cameraPermission => {
    //     return cameraPermission;
    //   })
    //   .then(cameraPermission => {
    //     Permissions.request('photo').then(photoPermission => {
    //       if (
    //         cameraPermission === 'authorized' &&
    //         photoPermission === 'authorized'
    //       ) {
    //         triggerFunc();
    //       }
    //     });
    //   });
  }

  checkPermission(triggerFunc, openSettings = undefined) {
    // let permissionAsk = Platform.OS === 'ios' ? 'denied' : 'restricted';

    Promise.all([
      check(CAMERA_PERMISSION),
      check(GALLERY_PERMISSION),
      // …
    ]).then(([cameraStatus, photoStatus]) => {
      if (
        cameraStatus === RESULTS.BLOCKED ||
        photoStatus === RESULTS.BLOCKED ||
        photoStatus === RESULTS.LIMITED
      ) {
        this.openSettingModal();
      } else {
        this.handlePermissions(triggerFunc);
      }
    });

    // Permissions.checkMultiple(['camera', 'photo']).then(response => {
    //   if (
    //     response.camera === permissionAsk ||
    //     response.photo === permissionAsk
    //   ) {
    //     this.openSettingModal();
    //   } else {
    //     this.handlePermissions(triggerFunc);
    //   }
    // });
  }
}

export default new MediaPicker();
