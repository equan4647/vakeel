import React, { useRef, useState } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import { MenuProvider } from 'react-native-popup-menu';
import _ from 'lodash';
import CNRichTextEditor, {
  CNToolbar,
  getDefaultStyles,
} from 'react-native-cn-richtext-editor';

import { AppStyles, Colors, Images } from '../../theme';
import FontSelector from './FontSelector';
import styles from './styles';
import options from './options';
import { KeyboardSpacer } from '..';
import { strings } from '../../utils/i18n';

const defaultStyles = getDefaultStyles();

const Editor = props => {
  const editorRef = useRef();

  const [selectedTag, setSelectedTag] = useState('body');
  const [selectedStyles, setSelectedStyles] = useState([]);
  // const [value, setValue] = useState(['']);

  const onStyleKeyPress = toolType => {
    if (toolType === 'image') {
      return;
    }
    editorRef.current.applyToolbar(toolType);
  };

  const onSelectedTagChanged = tag => setSelectedTag(tag);
  const onSelectedStyleChanged = style => setSelectedStyles(style);
  // const onValueChanged = text => setValue(text);
  const getIconSet = () =>
    options.map(item => {
      const { type, toolTypeText, buttonTypes } = item;
      let toolObject = {
        toolTypeText,
        iconComponent:
          toolTypeText === 'fontName'
            ? renderfontSelector()
            : renderIconButton(Images.toolbar[toolTypeText]),
      };
      if (!_.isUndefined(buttonTypes)) {
        toolObject.buttonTypes = buttonTypes;
      }
      return {
        type,
        iconArray: [toolObject],
      };
    });

  // const insertImage = url => {
  //   editorRef.current.insertImage(url);
  // };
  // const renderImageSelector = () => <Image source={Images.images.emptyPhoto} />;

  const onRemoveImage = ({ url, id }) => {
    /*do what you have to do after removing an image*/
  };

  const renderIconButton = source => (
    <Image resizeMode="contain" source={source} />
  );

  const renderfontSelector = () => (
    <FontSelector
      onSelect={fontFamily =>
        editorRef.current.applyToolbar('fontName', fontFamily)
      }
    />
  );

  const { placeholder, value, onValueChanged } = props;
  return (
    <>
      <MenuProvider style={[AppStyles.flex1]}>
        <View style={AppStyles.container}>
          <CNRichTextEditor
            ref={editorRef}
            styleList={defaultStyles}
            foreColor={Colors.white}
            placeholder
            {...{
              onSelectedTagChanged,
              onSelectedStyleChanged,
              value,
              onValueChanged,
              onRemoveImage,
              placeholder,
            }}
          />
        </View>

        <CNToolbar
          style={styles.toolbar}
          iconSet={getIconSet()}
          backgroundColor={Colors.white}
          color={Colors.black}
          selectedColor={Colors.white}
          selectedBackgroundColor={Colors.primary}
          {...{ selectedTag, selectedStyles, onStyleKeyPress }}
        />
      </MenuProvider>

      <KeyboardSpacer />
    </>
  );
};

Editor.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
};

Editor.defaultProps = {
  placeholder: strings('app.editor_placeholder'),
  value: '',
};
export default Editor;
