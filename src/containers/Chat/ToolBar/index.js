import { View, TextInput, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { Images, Colors, Fonts, Metrics } from '../../../theme';
import { MESSAGE_TYPE } from '../../../ChatUtil/Constants';
import { ButtonView, Image } from '../../../components';
import ChatHelper from '../../../ChatUtil/ChatHelper';
import { MediaPicker, Util } from '../../../utils';
import { strings } from '../../../utils/i18n';
import styles from './styles';

import { chatActions } from '../../../ducks/chat';

const ToolBar = ({
  showAttachment,
  roomId,
  isSocketConnected,
  scrollListToTop,
}) => {
  // dispatch
  const dispatch = useDispatch();

  const [searchText, setSearchText] = React.useState('');
  const [isUploading, setIsUploading] = React.useState(false);
  const [isSendingMessage, setIsSendingMessage] = React.useState(false);

  const onPressSend = () => {
    const textMessage = searchText.trim();
    if (textMessage !== '' && isSendingMessage === false) {
      const message = { message_type: MESSAGE_TYPE.TEXT, message: textMessage };
      const messageJson = JSON.stringify(message);
      setIsSendingMessage(true);
      ChatHelper.sendMessageToRoom(messageJson, roomId, () => {
        setSearchText('');
        scrollListToTop();
        setIsSendingMessage(false);
      });
    }
  };

  const uploadFileAndSendMessage = uri => {
    setIsUploading(true);
    dispatch(
      chatActions.uploadFileAndSendMessage(roomId, uri, () => {
        setIsUploading(false);
        scrollListToTop();
      })
    );
  };

  const onPressAttachment = () => {
    const handleOnPress = index => {
      if (index === 0) {
        MediaPicker.pickImageFromGallery(image => {
          uploadFileAndSendMessage(image.path);
        });
      } else if (index === 1) {
        MediaPicker.pickImageFromCamera(image => {
          uploadFileAndSendMessage(image.path);
        });
      }
    };
    Util.showActionSheet(
      [
        strings('mediaPicker.gallery'),
        strings('mediaPicker.camera'),
        strings('mediaPicker.cancel'),
      ],
      handleOnPress,
      -1
    );
  };

  const renderTextInput = () => {
    return (
      <TextInput
        placeholder={strings('chat.placeholder_input')}
        style={[styles.textInput, { fontFamily: Fonts.type.semiBold }]}
        value={searchText}
        placeholderTextColor={Colors.placeholder}
        onChangeText={text => setSearchText(text)}
        autoCapitalize="none"
        multiline
      />
    );
  };

  const renderSendIcon = () => {
    const disabled = isSocketConnected === false || searchText === '';
    return (
      <ButtonView
        style={styles.sendIcon}
        onPress={onPressSend}
        disabled={disabled}
        hitSlop={Metrics.hitSlop}
      >
        <Image source={Images.icons.send} />
      </ButtonView>
    );
  };

  const renderAttachmentIcon = () => {
    if (showAttachment) {
      return (
        <ButtonView
          style={styles.attachmentIcon}
          onPress={onPressAttachment}
          hitSlop={Metrics.hitSlop}
          disabled={!isSocketConnected}
        >
          <Image source={Images.icons.attachment} />
        </ButtonView>
      );
    }
    return;
  };

  const showActions = () => {
    if (isUploading) {
      return (
        <ActivityIndicator
          size="small"
          color={Colors.primary}
          style={styles.loader}
        />
      );
    }
    return (
      <React.Fragment>
        {renderAttachmentIcon()}
        {renderSendIcon()}
      </React.Fragment>
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.roundBox}>
        {renderTextInput()}
        {showActions()}
      </View>
    </View>
  );
};

ToolBar.propTypes = {
  showAttachment: PropTypes.showAttachment,
  onHeightInputChange: PropTypes.func,
  isSocketConnected: PropTypes.bool.isRequired,
};
ToolBar.defaultProps = {
  showAttachment: false,
  onHeightInputChange: undefined,
};

export default ToolBar;
