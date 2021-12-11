import DocumentPicker from 'react-native-document-picker';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Images, Colors, Fonts, Metrics } from '../../../theme';
import { MESSAGE_TYPE } from '../../../ChatUtil/Constants';
import { ButtonView, Image } from '../../../components';
import ChatHelper from '../../../ChatUtil/ChatHelper';
import { MediaPicker, Util } from '../../../utils';
import { strings } from '../../../utils/i18n';
import styles from './styles';

const ToolBar = ({ showAttachment, roomId, isSocketConnected }) => {
  const [searchText, setSearchText] = React.useState('');

  const onPressSend = () => {
    if (searchText) {
      const message = { message_type: MESSAGE_TYPE.TEXT, message: searchText };
      const messageJson = JSON.stringify(message);
      ChatHelper.sendMessageToRoom(messageJson, roomId, () => {
        setSearchText('');
      });
    }
  };

  const onPressAttachment = () => {
    const { pdf, doc, docx, ppt, pptx, xlsx, xls } = DocumentPicker.types;
    const handleOnPress = async index => {
      if (index === 0) {
        MediaPicker.pickImageFromGallery(image => console.log(image));
      } else if (index === 1) {
        try {
          const res = await DocumentPicker.pick({
            type: [pdf, doc, docx, ppt, pptx, xlsx, xls],
          });

          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    };
    Util.showActionSheet(['Gallery', 'Document', 'Cancel'], handleOnPress, -1);
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
          disabled={isSocketConnected}
        >
          <Image source={Images.icons.attachment} />
        </ButtonView>
      );
    }
    return;
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.roundBox}>
        {renderTextInput()}
        {renderAttachmentIcon()}
        {renderSendIcon()}
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
