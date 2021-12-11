import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text, Image, ImageViewHttp, ButtonView } from '../../../components';
import { MESSAGE_TYPE } from '../../../ChatUtil/Constants';
import { Colors, Images, Metrics } from '../../../theme';
import { ChatDataUtil } from '../../../ChatUtil';
import MessageTime from '../MessageTime';
import { DataHandler, Util } from '../../../utils';
import styles from './styles';

const Item = ({ item, showDate }) => {
  const isMine = ChatDataUtil.isChatMine(item);

  // set alignment and text color and background color message
  const alignSelf = isMine ? 'flex-end' : 'flex-start';
  const textColor = isMine ? Colors.white : Colors.black;
  const backgroundColorMessageView = isMine
    ? Colors.frogGreen2
    : Colors.paleLilac;

  // set message view style
  const styleMessageView = {
    backgroundColor: backgroundColorMessageView,
    alignSelf,
  };

  // set arrow style and image
  const arrowImage = isMine
    ? Images.icons.chatPointerRight
    : Images.icons.chatPointerLeft;
  const arrowStyle = isMine ? { right: -5 } : { left: -5 };
  const message = ChatDataUtil.getChatMessage(item);
  const messageType = ChatDataUtil.getTypeFromMessage(message);

  const renderDate = () => {
    if (showDate) {
      return (
        <Text
          size="size_14"
          type="semiBold"
          color="blueGreyTwo"
          style={styles.date}
        >
          {Util.formatDateDayChat(ChatDataUtil.getChatMessageDate(item))}
        </Text>
      );
    }

    return null;
  };

  const renderMessage = () => {
    if (messageType === MESSAGE_TYPE.TEXT) {
      return (
        <View style={[styles.messageContainer, styleMessageView]}>
          <Text size="size_15" color={textColor} style={styles.message}>
            {ChatDataUtil.getTextFromMessage(message)}
          </Text>
          <View style={[styles.arrow, arrowStyle]}>
            <Image source={arrowImage} />
          </View>
        </View>
      );
    } else if (messageType === MESSAGE_TYPE.IMAGE) {
      const imageUrl = ChatDataUtil.getTextFromMessage(message);

      return (
        <ButtonView
          onPress={() => {
            DataHandler.getImageViewerModalRef().show(imageUrl);
          }}
        >
          <ImageViewHttp
            url={imageUrl}
            style={[styles.image, { alignSelf }]}
            borderRadius={Metrics.ratio(8)}
          />
        </ButtonView>
      );
    } else {
      return null;
    }
  };

  const renderTimeMessage = () => {
    return (
      <MessageTime
        isMine={isMine}
        datetime={ChatDataUtil.getChatMessageDate(item)}
      />
    );
  };

  if (messageType !== MESSAGE_TYPE.TEXT && messageType !== MESSAGE_TYPE.IMAGE) {
    return null;
  }

  return (
    <>
      {renderTimeMessage()}
      {renderMessage()}
      {renderDate()}
    </>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  showDate: PropTypes.bool,
};

Item.defaultProps = { showDate: false };

export default React.memo(Item, (prevProps, nextProps) => {
  return (
    prevProps.item === nextProps.item &&
    prevProps.showDate === nextProps.showDate
  );
});
